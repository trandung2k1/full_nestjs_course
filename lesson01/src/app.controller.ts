import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}
    // @UseGuards(AuthGuard)
    @Get()
    welcomeServer(): { message: string } {
        return this.appService.welcomeServer();
    }
}
