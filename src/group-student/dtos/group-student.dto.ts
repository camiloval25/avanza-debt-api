import { OmitType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class GroupStudentDTO {
  @IsUUID('4')
  id: string;

  @IsString()
  @IsNotEmpty()
  group: string;

  @IsString()
  @IsNotEmpty()
  student: string;

  @IsBoolean()
  @IsOptional()
  liquidated: boolean;

  @IsDate()
  createdAt: Date;
}

export class CreateGroupStudentDTO extends OmitType(GroupStudentDTO, [
  'id',
  'liquidated',
  'createdAt',
] as const) {}

export class UpdateGroupStudentDTO extends PartialType(CreateGroupStudentDTO) {}
