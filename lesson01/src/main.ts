import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as colors from 'colors';
import helmet from 'helmet';
import { INestApplication } from '@nestjs/common';
async function application() {
    const port = 3000;
    const app: INestApplication = await NestFactory.create(AppModule);
    const whitelist = ['http://localhost:4000'];
    app.enableCors({
        origin: function (origin, callback) {
            if (whitelist.indexOf(origin) !== -1 || !origin) {
                if (origin) {
                    console.log('Allowed cors for:', origin);
                }
                callback(null, true);
            } else {
                console.log('Blocked cors for:', origin);
                callback(new Error('Not allowed by CORS'));
            }
        },
        allowedHeaders:
            'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe',
        methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
        credentials: true,
    });
    app.use(helmet());
    app.use(morgan('combined'));
    const server = app.getHttpServer();
    await app.listen(port);
    console.log(colors.green(`Server listen on http://localhost:${port}`));
    const router = server._events.request._router;
    const availableRoutes: any[] = router.stack
        .map((layer) => {
            if (layer.route) {
                return {
                    route: {
                        path: layer.route?.path,
                        method: layer.route?.stack[0].method,
                    },
                };
            }
        })
        .filter((item) => item !== undefined);
    console.log('Routes: ', availableRoutes);
}

(async () => {
    await application();
})();
