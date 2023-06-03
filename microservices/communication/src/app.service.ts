import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly users: any[] = [];
  getHello(): string {
    return 'Hello World!';
  }
  handleUserCreated(data: any) {
    console.log('Communication', data);
  }
}
