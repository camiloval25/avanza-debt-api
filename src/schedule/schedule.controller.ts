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
import { CreateScheduleDTO, UpdateScheduleDTO } from './dtos/schedule.dto';
import { ScheduleService } from './schedule.service';

@ApiTags('Schedules')
@Auth()
@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  async getAllSchedules() {
    return await this.scheduleService.getAllSchedules();
  }

  @Post()
  async createSchedule(@Body() schedule: CreateScheduleDTO) {
    return await this.scheduleService.createSchedule(schedule);
  }

  @Put(':id')
  async updateSchedule(
    @Param('id') id: string,
    @Body() schedule: UpdateScheduleDTO,
  ) {
    return await this.scheduleService.updateSchedule(id, schedule);
  }

  @Delete(':id')
  async deleteSchedule(@Param('id') id: string) {
    return await this.scheduleService.deleteSchedule(id);
  }
}
