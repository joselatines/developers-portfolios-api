import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { upload } from '../../multer.config';

export const multerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.info('multer middleware...');
  // TODO: add more thumbnail
  upload.single('thumbnail')(req, res, function (error) {
    if (error instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ message: 'Multer Error', success: false, error });
    } else if (error) {
      return res
        .status(500)
        .json({ message: 'Internal Server Error', success: false, error });
    }
    next();
  });
};
