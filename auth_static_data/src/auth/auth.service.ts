import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signIn({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<Omit<User, 'password'> & { accessToken: string }> {
    const findUser = await this.userService.findOneUser(username);
    if (findUser) {
      if (findUser.password === password) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...info } = findUser;
        const accessToken = await this.jwtService.signAsync({ ...info });
        return { ...info, accessToken };
      }
    } else {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
