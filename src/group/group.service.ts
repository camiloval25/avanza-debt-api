import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGroupDTO, GroupDTO, UpdateGroupDTO } from './dtos/group.dto';
import { Group } from './entities/group.entity';
import { CourseService } from 'src/course/course.service';
import { GroupStudent } from 'src/group-student/entities/group-student.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    private readonly courseService: CourseService,
  ) {}

  async getAllGroups(): Promise<GroupDTO[] | null> {
    return await this.groupRepository.find({
      relations: ['schedule', 'course'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async getGroupsAvailableByStudentId(studentId: string) {
    const availableGroups = await this.groupRepository
      .createQueryBuilder('groups')
      .select('groups.id', 'id')
      .addSelect('CONCAT(courses.name, " / ", groups.name)', 'name')
      .innerJoin('groups.course', 'courses')
      .leftJoin(
        'groups-students',
        'groups-students',
        'groups.id <> groups-students.groupId',
      )
      .where('groups-students.studentId = :studentId', { studentId })
      .getRawMany();

    return availableGroups;
  }

  async getGroupById(id: string): Promise<GroupDTO> {
    return await this.groupRepository.findOne(id, {
      relations: ['schedule', 'course'],
    });
  }

  async createNewGroup(groupToCreate: CreateGroupDTO): Promise<GroupDTO> {
    const course = await this.courseService.getCourseById(groupToCreate.course);
    if (!course) throw new BadRequestException("Course doesn't exist");

    const group = this.groupRepository.create(groupToCreate);
    return await this.groupRepository.save(group);
  }

  async updateCourse(
    id: string,
    groupToUpdate: UpdateGroupDTO,
  ): Promise<GroupDTO> {
    const group = await this.groupRepository.findOne(id, {
      loadRelationIds: true,
    });

    if (!group) throw new BadRequestException("Group doesn't exist");

    if (groupToUpdate.course) {
      const courseExist = await this.courseService.getCourseById(
        groupToUpdate.course,
      );
      if (!courseExist) throw new BadRequestException("Course doesn't exist");
    }

    const groupEdited = Object.assign(group, groupToUpdate);
    return await this.groupRepository.save(groupEdited);
  }

  async deleteCourse(id: string): Promise<any> {
    const group = await this.groupRepository.findOne(id, {
      loadRelationIds: true,
    });
    if (!group) throw new BadRequestException("Group doesn't exist");
    return await this.groupRepository.remove(group);
  }
}
