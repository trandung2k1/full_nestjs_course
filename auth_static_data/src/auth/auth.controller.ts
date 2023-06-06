import {
  Body,
  Controller,
  Post,
  Res,
  Req,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';
export class UserDto {
  username: string;
  password: string;
}
interface CustomRequest extends Request {
  user: { userId: number; username: string; iat: number; exp: number };
}
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async signIn(@Res() response: Response, @Body() signInDto: UserDto) {
    const rs = await this.authService.signIn(signInDto);
    return response.status(200).json(rs);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @Get('profile')
  async getProfile(@Req() req: CustomRequest) {
    return req.user;
  }
}
