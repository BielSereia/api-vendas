import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import { routes } from '@shared/http/routes/index';
import { AppError } from '@shared/errors/AppError';
import '@shared/typeorm/index';
import { multerConfig } from '@config/upload';
import { pagination } from 'typeorm-pagination';
import { rateLimiter } from './middlewares/rateLimiter';

const app = express();

app.use(cors());
app.use(express.json());

app.use(rateLimiter);

app.use(pagination);

app.use('/files', express.static(multerConfig.directory));

app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
      error: error.message,
    });
  },
);

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
