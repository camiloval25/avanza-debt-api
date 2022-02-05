import { OmitType, PartialType } from '@nestjs/mapped-types';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { CourseType } from '../enums/course.enum';

export class CourseDTO {
  @IsUUID('4')
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  duration: number;

  @IsEnum(CourseType)
  courseType: CourseType;

  @IsDate()
  createdAt: Date;
}

export class CreateCourseDTO extends OmitType(CourseDTO, [
  'id',
  'createdAt',
] as const) {}

export class UpdateCourseDTO extends PartialType(CreateCourseDTO) {}
