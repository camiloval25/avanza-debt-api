import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupStudentService } from 'src/group-student/group-student.service';
import { PayHistoryService } from 'src/pay-history/pay-history.service';
import { Repository } from 'typeorm';
import {
  CreateStudentDTO,
  StudentDTO,
  UpdateStudentDTO,
} from './dtos/student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,

    @Inject(forwardRef(() => GroupStudentService))
    private readonly groupStudentService: GroupStudentService,
    private readonly payHistoryService: PayHistoryService,
  ) {}

  async getAllStudents(): Promise<StudentDTO[] | null> {
    return await this.studentRepository.find();
  }

  async getStudentById(id: string): Promise<any> {
    const student = await this.studentRepository.findOne(id);

    const enrolledList =
      await this.groupStudentService.getEnrolledGroupsByStudentId(id);

    const paymentHistory =
      await this.payHistoryService.getStudentPaymentHistory(id);

    return { ...student, enrolledList, paymentHistory };
  }

  async getStudentsCloseToPay(query: object) {
    return query;
  }

  async createNewStudent(student: CreateStudentDTO): Promise<StudentDTO> {
    const studentExist = await this.studentRepository.findOne({
      identification: student.identification,
    });

    if (studentExist) throw new BadRequestException('Student already exist');

    const newStudent = this.studentRepository.create(student);
    return await this.studentRepository.save(newStudent);
  }

  async updateStudent(
    id: string,
    studentToUpdate: UpdateStudentDTO,
  ): Promise<StudentDTO> {
    const student = await this.studentRepository.findOne({ id });
    if (!student) throw new BadRequestException("Student doesn't exist");

    const studentUpdated = Object.assign(student, studentToUpdate);
    return await this.studentRepository.save(studentUpdated);
  }
}
