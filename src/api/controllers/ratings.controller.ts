import { Request, Response } from 'express';
import APIResponse from '../../interfaces/responses/APIResponse';
import { Ratings, RatingsDocument } from '../../database/models/rating.model';
import { getUserFromToken } from '../../utils/jwt';
import { handleServerError } from '../../errors/server.error';

const parseRating = (rating: number): number => Math.min(rating, 10);

export async function getAllRatings(req: Request, res: Response<APIResponse>) {
  try {
    const ratings = await Ratings.findAll();
    res
      .status(200)
      .json({ message: 'Get all ratings', success: true, data: ratings });
  } catch (error) {
    handleServerError(res, error);
  }
}

export async function createRating(req: Request, res: Response<APIResponse>) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(500).json({
        message: 'You need to pass a token to the auth header',
        success: false,
      });
    }

    const user: any = getUserFromToken(token);
    if (!user) {
      return res
        .status(500)
        .json({ message: 'User not on auth header', success: false });
    }

    const ratingBody: RatingsDocument = req.body;

    const ratingCreated = await Ratings.create({
      ...ratingBody,
      rating: parseRating(ratingBody.rating),
      user_id: user.id,
    });

    res.status(201).json({
      message: 'Ratings created',
      success: true,
      data: ratingCreated,
    });
  } catch (error: any) {
    if (error.name === 'SequelizeUniqueConstraintError')
      return res.status(200).json({
        message:
					'You have rated this before (you can only rate a portfolio once)',
        success: true,
      });

    handleServerError(res, error);
  }
}

export async function deleteRating(req: Request, res: Response<APIResponse>) {
  try {
    const ratingId = req.params.id;

    // Check if the rating exists
    const ratingToDelete = await Ratings.findByPk(ratingId);
    if (!ratingToDelete) {
      return res.status(404).json({
        message: 'Rating not found',
        success: false,
      });
    }

    // Delete the rating
    await Ratings.destroy({
      where: {
        id: ratingId,
      },
    });

    res.status(200).json({
      message: 'Rating deleted successfully',
      success: true,
      data: ratingToDelete,
    });
  } catch (error) {
    handleServerError(res, error);
  }
}
