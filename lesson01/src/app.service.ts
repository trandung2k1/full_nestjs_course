import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    welcomeServer(): { message: string } {
        return {
            message: 'Welcome to the server 👋👋',
        };
    }
}
