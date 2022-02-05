import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { SignInDTO, UserDTO } from 'src/user/dtos/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async loginUser(@Body() login: SignInDTO, @User() user: UserDTO) {
    return this.authService.login(user);
  }
}
