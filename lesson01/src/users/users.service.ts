import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users: User[] = [
        {
            userId: 1,
            username: 'Admin',
            role: Role.admin,
            password: 'admin',
        },
        {
            userId: 2,
            username: 'Dung',
            role: Role.user,
            password: 'dung',
        },
    ];
    async findOne(username: string): Promise<User> {
        const findUser: User = this.users.find(
            (user) => user.username === username,
        );
        return findUser;
    }
}
