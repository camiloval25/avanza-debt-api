import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  IsDateString,
} from 'class-validator';

export class PayHistoryDTO {
  @IsUUID('4')
  id: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  remaining: number;

  @IsDateString()
  @IsNotEmpty()
  nextDueDate: Date;

  @IsString()
  @IsNotEmpty()
  groupStudent: string;

  @IsString()
  @IsOptional()
  payRegisteredBy: string;

  @IsDate()
  createdAt: Date;
}

export class CreatePayDTO extends OmitType(PayHistoryDTO, [
  'id',
  'createdAt',
] as const) {}

export class UpdatePayDTO extends PartialType(CreatePayDTO) {}

export class StudentHistoryDTO {
  id: string;
  amountPayed: number;
  payDate: string;
  courseName: string;
  coursePrice: string;
  remainingDebt: number;
}
