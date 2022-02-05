import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { groupByKey } from 'src/common/utils';
import { Repository } from 'typeorm';
import { CourseDTO, CreateCourseDTO, UpdateCourseDTO } from './dtos/course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async getAllCourses(): Promise<Course[] | null> {
    return await this.courseRepository.find();
  }

  async getCoursesByType(): Promise<any> {
    const coursesByType = await this.courseRepository.find();

    const coursesByTypeGrouped = groupByKey(coursesByType, 'courseType');
    return coursesByTypeGrouped;
  }

  async getCourseById(id: string): Promise<CourseDTO> {
    return await this.courseRepository.findOne(id);
  }

  async createNewCourse(course: CreateCourseDTO): Promise<Course> {
    const courseToCreate = this.courseRepository.create(course);
    return await this.courseRepository.save(courseToCreate);
  }

  async updateCourse(
    id: string,
    courseToUpdate: UpdateCourseDTO,
  ): Promise<Course> {
    const course = await this.courseRepository.findOne({ id });
    if (!course) throw new BadRequestException("Course doesn't exist");

    const courseEdited = Object.assign(course, courseToUpdate);
    return await this.courseRepository.save(courseEdited);
  }

  async deleteCourse(id: string): Promise<Course> {
    const course = await this.courseRepository.findOne({ id });
    if (!course) throw new BadRequestException("Course doesn't exist");

    return await this.courseRepository.remove(course);
  }
}
