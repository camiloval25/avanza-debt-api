import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { GroupStudent } from 'src/group-student/entities/group-student.entity';
import { PayHistory } from './entities/pay-history.entity';
import { CreatePayDTO } from './dtos/pay-history.dto';
import { UserDTO } from 'src/user/dtos/user.dto';
import { PdfsService } from 'src/pdfs/pdfs.service';

@Injectable()
export class PayHistoryService {
  constructor(
    @InjectRepository(PayHistory)
    private readonly payHistoryRepository: Repository<PayHistory>,

    @InjectRepository(GroupStudent)
    private readonly groupStudentRepository: Repository<GroupStudent>,
    private readonly entityManager: EntityManager,

    private readonly pdfService: PdfsService,
  ) {}

  async getStudentPaymentReceipt(paymentHistoryId: string) {
    const receipt = await this.payHistoryRepository
      .createQueryBuilder('pay-histories')
      .select('pay-histories.id', 'paymentHistoryId')
      .addSelect('pay-histories.createdAt', 'paymentCreatedAt')
      .addSelect('pay-histories.amount', 'payHistoryAmount')
      .addSelect('pay-histories.remaining', 'remainingDebt')
      .addSelect('students.firstName', 'studentFirstName')
      .addSelect('students.lastName', 'studentLastName')
      .addSelect('students.documentType', 'studentDocumentType')
      .addSelect('students.identification', 'studentIdentification')
      .addSelect('students.contactPhone', 'studentContactPhone')
      .addSelect('schedules.name', 'scheduleName')
      .addSelect('schedules.scheduleType', 'scheduleType')
      .addSelect('courses.name', 'courseName')
      .addSelect('courses.price', 'coursePrice')
      .addSelect('groups-students.id', 'groupStudentId')
      .innerJoin('pay-histories.groupStudent', 'groups-students')
      .innerJoin('groups-students.student', 'students')
      .innerJoin('groups-students.group', 'groups')
      .innerJoin('groups.schedule', 'schedules')
      .innerJoin('groups.course', 'courses')
      .where('pay-histories.id = :paymentHistoryId', {
        paymentHistoryId,
      })
      .getRawOne();

    const receiptPdf = await this.pdfService.generatePaymentReceiptPDF(receipt);
    console.log('receipt PDF', receipt);
    return receiptPdf;
  }

  async getStudentPaymentHistory(studentId: string): Promise<any[]> {
    const studentHistory = await this.payHistoryRepository
      .createQueryBuilder('pay-histories')
      .select('pay-histories.id', 'id')
      .addSelect('pay-histories.createdAt', 'payDate')
      .addSelect('pay-histories.amount', 'amountPayed')
      .addSelect('pay-histories.remaining', 'remainingDebt')
      .addSelect('courses.name', 'courseName')
      .addSelect('courses.price', 'coursePrice')
      .innerJoin('pay-histories.groupStudent', 'groups-students')
      .innerJoin('groups-students.student', 'students')
      .innerJoin('groups-students.group', 'groups')
      .innerJoin('groups.course', 'courses')
      .where('students.id = :studentId', { studentId })
      .orderBy('pay-histories.createdAt', 'DESC')
      .getRawMany();

    return studentHistory;
  }

  async getNextStudentsToPay(query: any): Promise<any> {
    const studentsCloseToPay = await this.payHistoryRepository
      .createQueryBuilder('pay-histories')
      .select('pay-histories.id', 'id')
      .addSelect('pay-histories.nextDueDate', 'nextDueDate')
      .addSelect('students.id', 'studentId')
      .addSelect('students.firstName', 'firstName')
      .addSelect('students.lastName', 'lastName')
      .addSelect('students.documentType', 'documentType')
      .addSelect('students.identification', 'identification')
      .innerJoin('pay-histories.groupStudent', 'groups-students')
      .innerJoin('groups-students.student', 'students')
      .where('pay-histories.nextDueDate >= :currentDate', {
        currentDate: new Date(),
      })
      .limit(query.limit)
      .orderBy('pay-histories.nextDueDate', 'ASC')
      .getRawMany();

    return studentsCloseToPay;
  }

  async registerPay(payInformation: CreatePayDTO, user: UserDTO) {
    const { groupStudent, amount } = payInformation;
    const enrollInfo = await this.groupStudentRepository
      .createQueryBuilder('groups-students')
      .select('course.price', 'coursePrice')
      .addSelect('groups-students.liquidated', 'liquidated')
      .innerJoin('groups-students.group', 'groups')
      .innerJoin('groups.course', 'course')
      .where('groups-students.id = :id', {
        id: groupStudent,
      })
      .getRawOne();

    if (!enrollInfo)
      throw new BadRequestException(
        "Student doesn't enroll in this Course / Program",
      );

    if (enrollInfo.liquidated)
      throw new BadRequestException(
        'The student has already completed all fees',
      );

    const getStudentPays = await this.payHistoryRepository
      .createQueryBuilder('pay-histories')
      .select('COALESCE(SUM(pay-histories.amount),0)', 'totalPaid')
      .where('pay-histories.groupStudentId = :id', { id: groupStudent })
      .getRawOne();

    const coursePrice = parseFloat(enrollInfo.coursePrice);
    const studentPaymentHistory = parseFloat(getStudentPays.totalPaid);
    const studentTotalPay = amount + studentPaymentHistory;

    if (studentTotalPay > coursePrice) {
      const studentOwe = coursePrice - studentPaymentHistory;
      throw new BadRequestException(
        `You can't pay more than you owe, student owes $${studentOwe} `,
      );
    }

    return await this.entityManager.transaction(
      async (transactionManager: EntityManager) => {
        try {
          if (studentTotalPay === coursePrice) {
            await transactionManager.update(
              GroupStudent,
              { id: groupStudent },
              { liquidated: true },
            );
          }

          const addStudentPay = this.payHistoryRepository.create({
            ...payInformation,
            payRegisteredBy: user.id,
            remaining: coursePrice - studentTotalPay,
          });

          const payRegistered = await transactionManager.save(
            PayHistory,
            addStudentPay,
          );

          return {
            payRegistered,
            debtStatus: {
              remainingDebt: coursePrice - studentTotalPay,
            },
          };
        } catch (error) {
          throw new ConflictException(
            'Unexpected error, adding student payment',
          );
        }
      },
    );
  }
}
