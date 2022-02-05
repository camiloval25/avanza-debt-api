import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateScheduleDTO,
  ScheduleDTO,
  UpdateScheduleDTO,
} from './dtos/schedule.dto';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async getAllSchedules(): Promise<ScheduleDTO[] | null> {
    return await this.scheduleRepository.find({ loadRelationIds: true });
  }

  async createSchedule(schedule: CreateScheduleDTO): Promise<ScheduleDTO> {
    const scheduleToCreate = this.scheduleRepository.create(schedule);
    return await this.scheduleRepository.save(scheduleToCreate);
  }

  async updateSchedule(
    id: string,
    scheduleToUpdate: UpdateScheduleDTO,
  ): Promise<ScheduleDTO> {
    const schedule = await this.scheduleRepository.findOne({ id });
    if (!schedule) throw new BadRequestException("Schedule doesn't exist");

    const scheduleToSave = Object.assign(schedule, scheduleToUpdate);
    return await this.scheduleRepository.save(scheduleToSave);
  }

  async deleteSchedule(id: string): Promise<ScheduleDTO | null> {
    const scheduleToDelete = await this.scheduleRepository.findOne({ id });
    if (!scheduleToDelete)
      throw new BadRequestException("Schedule doesn't exist");
    return await this.scheduleRepository.remove(scheduleToDelete);
  }
}
