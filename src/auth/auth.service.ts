import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLoggedDTO } from 'src/user/dtos/user.dto';
import { UsersService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserLoggedDTO | null> {
    const user = await this.userService.getUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserLoggedDTO) {
    const payload = { sub: user.id };
    return { id: user.id, access_token: this.jwtService.sign(payload) };
  }
}
