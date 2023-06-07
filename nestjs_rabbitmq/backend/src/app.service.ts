import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('GREETING_SERVICE') private client: ClientProxy) {}
  async getHello() {
    return this.client.send({ cmd: 'greeting' }, 'Progressive Coder');
  }
  async getHelloAsync() {
    const message = await this.client.send(
      { cmd: 'greeting-async' },
      'Progressive Coder',
    );
    return message;
  }
  async publishEvent() {
    const data = {
      id: Math.floor(Math.random() * 100),
      bookName: 'The Way Of Kings',
      author: 'Brandon Sanderson',
      time: new Date(),
    };
    this.client.emit('book-created', data);
    return {
      message: 'Sent book service created',
    };
  }
  async getAllBooks() {
    return this.client.send({ cmd: 'get-all-books' }, {});
  }
}
