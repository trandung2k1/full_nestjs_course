import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/greeting')
  async getHello() {
    return this.appService.getHello();
  }
  @Get('/greeting-async')
  async getHelloAsync() {
    return this.appService.getHelloAsync();
  }
  @Get('/publish-event')
  async publishEvent() {
    return await this.appService.publishEvent();
  }
  @Get('/get-all-books')
  async getAllBooks() {
    return await this.appService.getAllBooks();
  }
}
