import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UseLoginDto, UseRegisterDto } from 'src/users/user.dto';
import { IUser } from 'src/users/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() userLoginDto: UseLoginDto) {
    return this.authService.login(userLoginDto.email, userLoginDto.password);
  }
  @Post('register')
  async register(
    @Body() userRegisterDto: UseRegisterDto,
  ): Promise<Omit<IUser, 'password'>> {
    return this.authService.register(
      userRegisterDto.firstName,
      userRegisterDto.lastName,
      userRegisterDto.age,
      userRegisterDto.email,
      userRegisterDto.password,
    );
  }
}
