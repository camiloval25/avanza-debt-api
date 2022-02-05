import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/users.entity';
import { CreateNewUserDTO, UserDTO } from './dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserByID(id: string): Promise<UserDTO | null> {
    return this.userRepository.findOne({ id });
  }

  async getAllUsers(): Promise<UserDTO[] | null> {
    return await this.userRepository.find();
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository
      .createQueryBuilder('user')
      .where({ email })
      .addSelect('user.password')
      .getOne();
  }

  async createUser(newUser: CreateNewUserDTO): Promise<User> {
    const emailExist = await this.getUserByEmail(newUser.email);
    if (emailExist) throw new BadRequestException('Email already used');

    const userToCreate = this.userRepository.create(newUser);
    const userCreated = await this.userRepository.save(userToCreate);

    delete userCreated.password;
    return userCreated;
  }
}
