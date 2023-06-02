import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private jwtService: JwtService,
    ) {}
    async signIn(
        username: string,
        password: string,
    ): Promise<Omit<User, 'password'> & { accessToken: string }> {
        const user: User = await this.userService.findOne(username);
        if (!user) {
            throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
        } else {
            if (user.password === password) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { password, ...info } = user;
                const { userId, role } = info;
                const accessToken = await this.jwtService.signAsync({
                    userId,
                    role,
                });
                return {
                    ...info,
                    accessToken,
                };
            } else {
                throw new HttpException(
                    'User Not Found',
                    HttpStatus.UNAUTHORIZED,
                );
            }
        }
    }
}
