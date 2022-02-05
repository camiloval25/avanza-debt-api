import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CreateStudentDTO, UpdateStudentDTO } from './dtos/student.dto';
import { StudentService } from './student.service';

@ApiTags('Students')
@Auth()
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async getAllStudents() {
    return await this.studentService.getAllStudents();
  }

  @Get('/close-to-pay')
  async getStudentsCloseToPay(@Query() query: object) {
    return await this.studentService.getStudentsCloseToPay(query);
  }

  @Get('/:id')
  async getStudentById(@Param('id') id: string) {
    return await this.studentService.getStudentById(id);
  }

  @Post()
  async createStudent(@Body() student: CreateStudentDTO) {
    return await this.studentService.createNewStudent(student);
  }

  @Put(':id')
  async updateStudent(
    @Param('id') id: string,
    @Body() student: UpdateStudentDTO,
  ) {
    return await this.studentService.updateStudent(id, student);
  }
}
