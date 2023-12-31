import { Request, Response } from 'express';
import APIResponse from '../../interfaces/responses/APIResponse';
import {
  Portfolio,
  PortfolioDocument,
} from '../../database/models/portfolio.model';
import { getUserFromToken } from '../../utils/jwt';
import { handleServerError } from '../../errors/server.error';
import { User } from '../../database/models/user.model';
import { Ratings } from '../../database/models/rating.model';
import { sequelize } from '../../database/connection';
import * as firebase from '../../utils/firebase/firebase';

export const getPortfoliosWithRatings = async (portfolios: any[]) => {
  const portfolioPromises = portfolios.map(async (portfolio: any) => {
    const averageRating: any = await Ratings.findOne({
      attributes: [
        [sequelize.fn('AVG', sequelize.col('rating')), 'averageRating'],
      ],
      where: {
        portfolio_id: portfolio.id,
      },
    });

    const avgRating = averageRating?.get('averageRating') | 10;
    return {
      ...portfolio.toJSON(),
      avgRating: Number(avgRating.toFixed(2)),
    };
  });

  return Promise.all(portfolioPromises);
};

export async function getPortfolios(req: Request, res: Response<APIResponse>) {
  try {
    const portfolios = await Portfolio.findAll({
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password', 'role', 'createdAt', 'updatedAt'],
          },
        },
      ],
    });

    const portfoliosWithAverageRating = await getPortfoliosWithRatings(
      portfolios,
    );

    res.status(200).json({
      message: 'Get all portfolios',
      success: true,
      data: portfoliosWithAverageRating,
    });
  } catch (error: any) {
    handleServerError(res, error);
  }
}

const getDate = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

  return formattedDate;
};

export async function createPortfolio(
  req: Request,
  res: Response<APIResponse>,
) {
  try {
    const authHeader: any = req.headers.authorization;
    const user: any = getUserFromToken(authHeader);

    if (!user)
      return res
        .status(200)
        .json({ message: 'Token not found auth header', success: false });

    const portfolioBody: PortfolioDocument = req.body;
    const thumbnail: string = portfolioBody.thumbnail;

    const name: string = `${getDate()}-${portfolioBody.title}.${thumbnail.split('/')[1].split(';')[0]}`;
    const url: string = await firebase.uploadFile({ name, ImageBase64: thumbnail });
    portfolioBody.thumbnail = url;

    const portfolioCreated = await Portfolio.create({
      ...portfolioBody,
      file_name: name,
      created_by: user.id,
    });

    res.status(201).json({
      message: 'Portfolio created',
      success: true,
      data: portfolioCreated,
    });
  } catch (error) {
    handleServerError(res, error);
  }
}

export async function getPortfolio(req: Request, res: Response<APIResponse>) {
  try {
    const portfolioId = req.params.id;
    const portfolioFound = await Portfolio.findByPk(portfolioId);
    res.status(200).json({
      message: 'Portfolio found',
      success: true,
      data: portfolioFound,
    });
  } catch (error) {
    handleServerError(res, error);
  }
}

export async function deletePortfolio(
  req: Request,
  res: Response<APIResponse>,
) {
  try {
    const portfolioId = req.params.id;
    const portfolioFound = await Portfolio.findByPk(portfolioId);
    if (portfolioFound === null) throw new Error('Not found');

    const fileName = portfolioFound.dataValues.file_name;

    const portfolioDeleted = await Portfolio.destroy({
      where: { id: portfolioId },
    });
    res.status(200).json({
      message: 'Portfolio deleted',
      success: true,
      data: portfolioDeleted,
    });

    await firebase.deleteFile(fileName);
  } catch (error) {
    handleServerError(res, error);
  }
}

export async function editPortfolio(req: Request, res: Response<APIResponse>) {
  try {
    const portfolioId = req.params.id;
    const portfolioBody = req.body;

    const [portfolioEdited] = await Portfolio.update(portfolioBody, {
      where: { id: portfolioId },
      returning: true,
    });

    res.status(200).json({
      message: 'Portfolio edited',
      success: true,
      data: portfolioEdited,
    });
  } catch (error) {
    handleServerError(res, error);
  }
}
