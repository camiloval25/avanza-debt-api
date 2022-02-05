import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { CreateNewUserDTO } from './dtos/user.dto';
import { UsersService } from './user.service';

@ApiTags('Users')
//@Auth()
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    return await this.userService.getUserByID(id);
  }

  @Get('/all')
  async getAllUsers(@User() user) {
    return this.userService.getAllUsers();
  }

  @Post()
  async createNewUser(@Body() user: CreateNewUserDTO) {
    return await this.userService.createUser(user);
  }
}
