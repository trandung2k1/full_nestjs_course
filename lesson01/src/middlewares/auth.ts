import {
    HttpException,
    HttpStatus,
    Injectable,
    NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
interface IRequest extends Request {
    userId: string;
}
@Injectable()
export class VerifyTokenMiddleware implements NestMiddleware {
    use(req: IRequest, res: Response, next: NextFunction) {
        const token = req.headers.authorization;
        if (!token) {
            throw new HttpException('Token not found', HttpStatus.NOT_FOUND);
        } else {
            const accessToken = token.split(' ')[1];
            jwt.verify(
                accessToken,
                'mysecret',
                (error: jwt.VerifyErrors, userId: string) => {
                    if (error) {
                        return res.status(401).json({
                            message: error.message,
                            errorName: error.name,
                        });
                    }
                    req.userId = userId;
                    next();
                },
            );
        }
    }
}
