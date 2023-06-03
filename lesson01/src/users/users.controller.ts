import { AuthGuard } from './../auth/auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}
    @UseGuards(AuthGuard)
    @Get('/')
    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }
}
