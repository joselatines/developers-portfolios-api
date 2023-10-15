import { Request, Response } from 'express';
import APIResponse from '../../interfaces/responses/APIResponse';

export async function getAllUsers(req: Request, res: Response<APIResponse>) {
  res.status(200).json({ message: 'Get all users', success: true, data: {} });
}
