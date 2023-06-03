import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @EventPattern('user_created')
  handleUserCreated(data: any) {
    this.appService.handleUserCreated(data);
  }
  @MessagePattern({ cmd: 'get_analytics' })
  getAnalytics() {
    return this.appService.getAnalytics();
  }
}
