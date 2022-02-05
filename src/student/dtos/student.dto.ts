import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { DocumentType } from 'src/common/enums/document-type.enum';

export class StudentDTO {
  @IsUUID('4')
  id: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEnum(DocumentType)
  documentType: DocumentType;

  @IsString()
  @IsNotEmpty()
  identification: string;

  @IsString()
  @IsNotEmpty()
  contactPhone: string;

  @IsDate()
  createdAt: Date;
}

export class CreateStudentDTO extends OmitType(StudentDTO, [
  'id',
  'createdAt',
] as const) {}

export class UpdateStudentDTO extends PartialType(CreateStudentDTO) {}
