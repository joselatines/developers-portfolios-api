import { Request, Response } from 'express';
import APIResponse from '../../interfaces/responses/APIResponse';
import { Ratings, RatingsDocument } from '../../database/models/rating.model';
import { getUserFromToken } from '../../utils/jwt';
import { handleServerError } from '../../errors/server.error';
import { Portfolio } from '../../database/models/portfolio.model';

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
      return res.status(400).json({
        message: 'Token is missing in the auth header',
        success: false,
      });
    }

    const user: any = getUserFromToken(token);

    if (!user)
      return res.status(401).json({
        message: 'User not found in the auth header',
        success: false,
      });

    const body: RatingsDocument = req.body;

    const portfolio = await Portfolio.findByPk(body.portfolio_id);

    const userRating = user.id; // user that is rating
    const portfolioOwner = portfolio?.dataValues.created_by;

    if (userRating === portfolioOwner)
      return res.status(200).json({
        message: 'You cannot rate your own portfolio',
        success: false,
      });

    const portfolioRated = await Ratings.create({
      ...body,
      rating: parseRating(body.rating),
      rated_by: user.id,
    });

    res.status(201).json({
      message: 'You has rated this portfolio',
      success: true,
      data: portfolioRated,
    });
  } catch (error: any) {
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
