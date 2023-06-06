import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/users/user.interface';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  //Static data
  // async login(email: string, password: string) {
  //   const user = await this.usersService.finOne(email);
  //   if (user) {
  //     if (user.password === password) {
  //       const accessToken: string = await this.jwtService.signAsync({
  //         userId: user.id,
  //         isAdmin: user.isAdmin,
  //       });
  //       // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //       const { password, ...info } = user;
  //       return { ...info, accessToken };
  //     } else {
  //       throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
  //     }
  //   } else {
  //     throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  //   }
  // }
  async login(email: string, password: string) {
    const user = await this.usersService.finOne(email);
    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        const accessToken: string = await this.jwtService.signAsync({
          userId: user.id,
          isAdmin: user.isAdmin,
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...info } = user;
        return { ...info, accessToken };
      }
      throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
  async register(
    firstName: string,
    lastName: string,
    age: number,
    email: string,
    password: string,
  ): Promise<Omit<IUser, 'password'>> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (user) {
      throw new HttpException('User already exists', HttpStatus.BAD_GATEWAY);
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
      const newUser = await this.usersRepository.save({
        firstName,
        lastName,
        age,
        email,
        password: hashedPassword,
      });
      delete newUser.password;
      return newUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
