import { Request, Response } from 'express';
import APIResponse from '../../interfaces/responses/APIResponse';
import { Ratings } from '../../database/models/rating.model';
import { handleServerError } from '../../errors/server.error';
import { User } from '../../database/models/user.model';
import { getUserFromToken } from '../../utils/jwt';
export async function getAllComments(req: Request, res: Response<APIResponse>) {
  try {
    const comments: any = await Ratings.findAll({
      order: [
        ['updatedAt', 'ASC'],
        ['createdAt', 'ASC'],
      ],
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password', 'role', 'createdAt', 'updatedAt', 'provider'],
          },
        },
      ],
    });

    const authHeader: any = req.headers.authorization;
    const user: any = getUserFromToken(authHeader);

    if (!user) {
      return res
        .status(200)
        .json({ message: 'Get all comments', success: true, data: comments });
    }

    // Separate comments by whether they are rated by the user
    const orderedComments = comments.reduce(
      (acc: any, comment: any) => {
        if (comment.rated_by === user.id) {
          acc.unratedComments.unshift(comment);
        } else {
          acc.ratedComments.push(comment);
        }
        return acc;
      },
      { unratedComments: [], ratedComments: [] },
    );

    // Combine the unrated and rated comments
    const finalOrderedComments = [
      ...orderedComments.unratedComments,
      ...orderedComments.ratedComments,
    ];

    return res
      .status(200)
      .json({ message: 'Get all comments', success: true, data: finalOrderedComments });
  } catch (error) {
    handleServerError(res, error);
  }
}

export async function deleteRating(req: Request, res: Response<APIResponse>) {
  try {
    const id = req.params.id;
    const ratingDeleted = await Ratings.destroy({
      where: { id: id },
    });
    res.status(200).json({
      message: 'Rating deleted',
      success: true,
      data: ratingDeleted,
    });
  } catch (error) {
    handleServerError(res, error);
  }
}
