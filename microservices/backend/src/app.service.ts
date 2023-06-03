import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './createUser.dto';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserEvent } from './created_user.event';
@Injectable()
export class AppService {
  private users: any[] = [];
  constructor(
    @Inject('COMMUNICATION') private readonly communicationClient: ClientProxy,
    @Inject('ANALYTICS') private readonly analyticsClient: ClientProxy,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  createUser(createUserDto: CreateUserDto) {
    this.users.push(createUserDto);
    this.communicationClient.emit(
      'user_created',
      new CreateUserEvent(createUserDto.email),
    );
    this.analyticsClient.emit(
      'user_created',
      new CreateUserEvent(createUserDto.email),
    );
  }
  getAnalytics() {
    return this.analyticsClient.send({ cmd: 'get_analytics' }, {});
  }
}
