import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    { userId: 1, username: 'John', password: 'john' },
    {
      userId: 2,
      username: 'Admin',
      password: 'admin',
    },
  ];
  async findOneUser(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
