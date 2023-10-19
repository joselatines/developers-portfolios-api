import { NextFunction, Request, Response } from 'express';
import APIResponse from '../../../interfaces/responses/APIResponse';
export async function logoutController(
  req: Request,
  res: Response<APIResponse>,
  next: NextFunction,
) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: 'Log out successfully', success: true });
  });
}
