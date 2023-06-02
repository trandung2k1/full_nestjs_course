import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VerifyTokenMiddleware } from './middlewares/auth';

@Module({
    imports: [
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 100,
        }),
        AuthModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(VerifyTokenMiddleware).forRoutes({
            path: '/',
            method: RequestMethod.ALL,
        });
    }
}
