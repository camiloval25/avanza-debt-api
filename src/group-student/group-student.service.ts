import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupService } from 'src/group/group.service';
import { StudentService } from 'src/student/student.service';
import { Repository } from 'typeorm';
import {
  CreateGroupStudentDTO,
  UpdateGroupStudentDTO,
} from './dtos/group-student.dto';
import { GroupStudent } from './entities/group-student.entity';

@Injectable()
export class GroupStudentService {
  constructor(
    @InjectRepository(GroupStudent)
    private readonly groupStudentRepository: Repository<GroupStudent>,
    private readonly groupService: GroupService,
    private readonly studentService: StudentService,
  ) {}

  async getEnrolledGroupsByStudentId(studentId: string): Promise<any[]> {
    const groupsEnrolled = await this.groupStudentRepository
      .createQueryBuilder('groups-students')
      .select('groups-students.id', 'id')
      .addSelect('CONCAT(courses.name, " / ", groups.name)', 'name')
      .addSelect('groups-students.liquidated', 'liquidated')
      .addSelect('courses.name', 'courseName')
      .addSelect('courses.price', 'coursePrice')
      .addSelect('groups.name', 'groupName')
      .addSelect('schedules.name', 'scheduleName')
      .addSelect('COALESCE(SUM(pay-histories.amount),0)', 'amountPayed')
      .addSelect(
        'courses.price - COALESCE(SUM(pay-histories.amount),0)',
        'remainingDebt',
      )
      .leftJoin(
        'pay-histories',
        'pay-histories',
        'pay-histories.groupStudentId = groups-students.id',
      )
      .innerJoin('groups-students.student', 'students')
      .innerJoin('groups-students.group', 'groups')
      .innerJoin('groups.course', 'courses')
      .innerJoin('groups.schedule', 'schedules')
      .where('groups-students.student = :studentId', { studentId })
      .groupBy('groups-students.id')
      .getRawMany();

    const invested = groupsEnrolled.reduce(
      (total, currentValue) => {
        const totalInvested = total.totalInvested + currentValue.coursePrice;
        const totalPayed = total.totalPayed + currentValue.amountPayed;
        return { totalInvested, totalPayed };
      },
      { totalInvested: 0, totalPayed: 0 },
    );

    return { groupsEnrolled, ...invested };
  }

  async getEnrolledStudentsPerMonth() {
    const enrolledPerMonth = await this.groupStudentRepository
      .createQueryBuilder('groups-students')
      .select('COUNT(groups-students.id)', 'totalEnrolled')
      .addSelect(
        `COALESCE(COUNT(CASE WHEN courses.courseType = "course" THEN 1 END),0)`,
        'enrolledInCourses',
      )
      .addSelect(
        `COALESCE(COUNT(CASE WHEN courses.courseType = "technical" THEN 1 END),0) `,
        'enrolledInTechnical',
      )
      .addSelect('MONTH(groups-students.createdAt)', 'month')
      .innerJoin('groups-students.student', 'students')
      .innerJoin('groups-students.group', 'groups')
      .innerJoin('groups.course', 'courses')
      .groupBy('MONTH(groups-students.createdAt)')
      .getRawMany();

    return enrolledPerMonth;
  }

  async enrollStudent(enroll: CreateGroupStudentDTO) {
    const { student, group } = enroll;

    const studentExist = await this.studentService.getStudentById(student);
    if (!studentExist) throw new BadRequestException("Student doesn't exist");

    const groupExist = await this.groupService.getGroupById(group);
    if (!groupExist) throw new BadRequestException("Group doesn't exist");

    const studentAlreadyEnroll = await this.groupStudentRepository.findOne({
      student,
      group,
    });

    if (studentAlreadyEnroll)
      throw new BadRequestException(
        'Student already enroll in this course/program',
      );

    const studentToEnroll = this.groupStudentRepository.create(enroll);
    return await this.groupStudentRepository.save(studentToEnroll);
  }

  async updateStudentGroup(
    id: string,
    group: string,
  ): Promise<UpdateGroupStudentDTO> {
    const enrollExist = await this.groupStudentRepository.findOne(id, {
      loadRelationIds: true,
    });
    if (!enrollExist) throw new BadRequestException("Enroll doesn't exist");

    const groupExist = await this.groupService.getGroupById(group);
    if (!groupExist) throw new BadRequestException("Group doesn't exist");

    const updateGroup = Object.assign(enrollExist, { group });
    return await this.groupStudentRepository.save(updateGroup);
  }

  async deleteStudentEnroll(id: string): Promise<CreateGroupStudentDTO> {
    const enrollExist = await this.groupStudentRepository.findOne(id, {
      loadRelationIds: true,
    });
    if (!enrollExist) throw new BadRequestException("Enroll doesn't exist");

    return await this.groupStudentRepository.remove(enrollExist);
  }
}
