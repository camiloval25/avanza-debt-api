import { PartialType, OmitType } from '@nestjs/mapped-types';
import { IsString, IsDate, IsUUID, IsEmail, IsEnum } from 'class-validator';
import { UserRoles } from '../enums/users.enum';

export class UserDTO {
  @IsUUID('4')
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEnum(UserRoles)
  role: UserRoles;

  @IsDate()
  createdAt: Date;
}

export class CreateNewUserDTO extends OmitType(UserDTO, [
  'id',
  'createdAt',
] as const) {}

export class ListOfUsers extends OmitType(UserDTO, ['password'] as const) {}

export class SignInDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class UserLoggedDTO extends PartialType(UserDTO) {}
