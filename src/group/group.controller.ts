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
import { CreateGroupDTO, UpdateGroupDTO } from './dtos/group.dto';
import { GroupService } from './group.service';

@ApiTags('Groups')
@Auth()
@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  async getAllGroups() {
    return await this.groupService.getAllGroups();
  }

  @Get('/:id')
  async getGroupById(@Param() id: string) {
    return await this.groupService.getGroupById(id);
  }

  @Get('/groups-availables/:studentId')
  async getGroupsAvailablesToStudent(@Param('studentId') studentId: string) {
    return await this.groupService.getGroupsAvailableByStudentId(studentId);
  }

  @Post()
  async createNewGroup(@Body() group: CreateGroupDTO) {
    return await this.groupService.createNewGroup(group);
  }

  @Put('/:id')
  async updateCourse(
    @Param('id') id: string,
    @Body() groupToUpdate: UpdateGroupDTO,
  ) {
    return await this.groupService.updateCourse(id, groupToUpdate);
  }

  @Delete(':id')
  async deleteCourse(@Param('id') id: string) {
    return await this.groupService.deleteCourse(id);
  }
}
