import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GroupDTO {
  @IsUUID('4')
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  course: string;

  @IsString()
  schedule: string;

  @IsDate()
  createdAt: Date;
}

export class CreateGroupDTO extends OmitType(GroupDTO, [
  'id',
  'createdAt',
] as const) {}

export class UpdateGroupDTO extends PartialType(CreateGroupDTO) {}
