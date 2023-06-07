import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  private books: any[] = [];
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'greeting' })
  getGreetingMessage(name: string): string {
    return `Hello ${name}`;
  }
  @MessagePattern({ cmd: 'greeting-async' })
  async getGreetingMessageAysnc(name: string): Promise<string> {
    return `Hello ${name} Async`;
  }
  @MessagePattern({ cmd: 'get-all-books' })
  async getAllBooks(): Promise<any> {
    return this.books;
  }
  @EventPattern('book-created')
  handleBookCreatedEvent(data: any) {
    this.books.push(data);
  }
}
