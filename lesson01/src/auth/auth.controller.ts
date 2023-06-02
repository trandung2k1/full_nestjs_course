import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './auth.dto';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('/login')
    async signIn(@Res() response: Response, @Body() signInDto: SignInDto) {
        const rs: Omit<User, 'password'> = await this.authService.signIn(
            signInDto.username,
            signInDto.password,
        );
        return response.status(200).json(rs);
    }
}
