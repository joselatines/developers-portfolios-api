import { Request, Response } from 'express';
import ErrorResponse from '../../interfaces/responses/ErrorResponse';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandlerMiddleware(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  // console.error('🚀 Error handler: ', err);
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}
