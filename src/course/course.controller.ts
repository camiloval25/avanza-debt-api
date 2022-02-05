import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CourseService } from './course.service';
import { CreateCourseDTO, UpdateCourseDTO } from './dtos/course.dto';

@ApiTags('Courses')
@Auth()
@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async getAllCourses() {
    return await this.courseService.getAllCourses();
  }

  @Get('/courses-by-type')
  async getCoursesByType() {
    return await this.courseService.getCoursesByType();
  }

  @Get('/:id')
  async getCourseById(@Param('id') id: string) {
    return await this.courseService.getCourseById(id);
  }

  @Post()
  async createNewCourse(@Body() course: CreateCourseDTO) {
    return await this.courseService.createNewCourse(course);
  }

  @Put(':id')
  async updateCourse(@Param('id') id: string, @Body() course: UpdateCourseDTO) {
    return await this.courseService.updateCourse(id, course);
  }

  @Delete(':id')
  async deleteCourse(@Param('id') id: string) {
    return await this.courseService.deleteCourse(id);
  }
}
