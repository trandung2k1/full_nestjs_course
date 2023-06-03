import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private analytics: any[] = [];
  getHello(): string {
    return 'Hello World!';
  }
  handleUserCreated(data: any) {
    console.log('Analytics', data);
    this.analytics.push({
      email: data.email,
      time: new Date(),
    });
  }
  getAnalytics() {
    return this.analytics;
  }
}
