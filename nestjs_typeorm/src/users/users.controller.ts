import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUser } from './user.interface';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(AuthGuard)
  @Get()
  async getAllUser() {
    return await this.usersService.findAllUsers();
  }
  @UseGuards(AuthGuard)
  @Get('all')
  async getAllUsers(@Request() req): Promise<Omit<IUser, 'password'>[]> {
    console.log(req.user);
    return await this.usersService.getAllUsers();
  }
}
