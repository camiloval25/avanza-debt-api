import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ScheduleDTO {
  @IsUUID('4')
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;

  @IsDate()
  createdAt: Date;
}

export class CreateScheduleDTO extends OmitType(ScheduleDTO, [
  'id',
  'createdAt',
] as const) {}

export class UpdateScheduleDTO extends PartialType(CreateScheduleDTO) {}
