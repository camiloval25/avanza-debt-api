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
import { CreateGroupStudentDTO } from './dtos/group-student.dto';
import { GroupStudentService } from './group-student.service';

@ApiTags('Group Student')
@Auth()
@Controller('groups-students')
export class GroupStudentController {
  constructor(private readonly groupStudentService: GroupStudentService) {}

  @Get('/enrolled-per-month')
  async enrolledPerMonth() {
    return await this.groupStudentService.getEnrolledStudentsPerMonth();
  }

  @Get('/student-enroll/:id')
  async getStudentEnroll(@Param('id') id: string) {
    return await this.groupStudentService.getEnrolledGroupsByStudentId(id);
  }

  @Post()
  async enrollStudent(@Body() enroll: CreateGroupStudentDTO) {
    return await this.groupStudentService.enrollStudent(enroll);
  }

  @Put(':id/:group')
  async updateStudentGroup(
    @Param('id') id: string,
    @Param('group') group: string,
  ) {
    return await this.groupStudentService.updateStudentGroup(id, group);
  }

  @Delete('/:id')
  async unrollStudent(@Param('id') id: string) {
    return await this.groupStudentService.deleteStudentEnroll(id);
  }
}
