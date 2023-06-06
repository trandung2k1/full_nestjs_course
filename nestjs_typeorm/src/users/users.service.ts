import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { IUser } from './user.interface';

@Injectable()
export class UsersService {
  private users: IUser[] = [
    {
      id: 1,
      firstName: 'john',
      lastName: 'doe',
      isAdmin: true,
      age: 30,
      email: 'johndoe@gmail.com',
      password: '123456',
    },
  ];
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  // Read data to db
  async findAllUsers(): Promise<Omit<IUser[], 'password'>> {
    const users = await this.usersRepository.find();
    const filteredUsers = users.map((u) => {
      delete u.password;
      return u;
    });
    return filteredUsers;
  }
  // Static data
  // async finOne(email: string): Promise<User | undefined> {
  //   return this.users.find((u) => u.email === email);
  // }
  async getAllUsers(): Promise<Omit<IUser, 'password'>[]> {
    const filterData = this.users.filter((u) => {
      delete u.password;
      return u;
    });
    return filterData;
  }
  async finOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email: email } });
  }
}
