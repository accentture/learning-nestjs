import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class CheckSurnamesMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('------------names', req.body.names)

        if (req.body.surnames !== 'diaz') {
            return res.status(400).json({ message: 'It is not the expected surname' })
        }

        next()
    }
}