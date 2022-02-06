import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsDate, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ScheduleTypeEnum } from 'src/common/enums/schedule-type.enum';

export class ScheduleDTO {
  @IsUUID('4')
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsEnum(ScheduleTypeEnum)
  @IsNotEmpty()
  scheduleType: ScheduleTypeEnum;

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
