import { Request, Response } from 'express';
import APIResponse from '../../../interfaces/responses/APIResponse';
import { handleServerError } from '../../../errors/server.error';
import { User } from '../../../database/models/user.model';
import { generateAccessToken } from '../../../utils/jwt';

export async function githubLogin(req: Request, res: Response<APIResponse>) {
  try {
    res.status(200).json({ success: true, message: 'Logged successfully' });
  } catch (error) {
    handleServerError(res, error);
  }
}

export async function githubLoginCallback(
  req: Request,
  res: Response<APIResponse>,
) {
  try {

    const requestUser = req.user as any;

    if (!requestUser) {
      return res.status(400).json({ message: 'User not on req', success: false });
    }

    const user: any = await User.findOne({
      raw: true,
      where: { email: requestUser._json.email },
    });

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password',
        success: false,
      });
    }

    const token = generateAccessToken({
      id: user.id,
      role: user.role,
    });

    res.status(200).json({
      message: 'Login successful',
      success: true,
      data: { user, token },
    });
  } catch (error) {
    handleServerError(res, error);
  }
}
