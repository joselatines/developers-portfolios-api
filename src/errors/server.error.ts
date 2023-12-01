import { Response } from 'express';

export const handleServerError = (res: Response, error: any) => {
  console.error('⚠️ -> ', error);
  return res
    .status(500)
    .json({ message: 'Internal Server Error', success: false, error });
};
