import { Request, Response } from "express";
import APIResponse from "../../interfaces/responses/APIResponse";
import {
	Portfolio,
	PortfolioDocument,
} from "../../database/models/portfolio.model";
import { getUserFromToken } from "../../utils/jwt";
import { handleServerError } from "../../errors/server.error";
import { User } from "../../database/models/user.model";
import { Ratings } from "../../database/models/rating.model";
import { sequelize } from "../../database/connection";

export const getPortfoliosWithRatings = async (portfolios: any[]) => {
	const portfolioPromises = portfolios.map(async (portfolio: any) => {
		const averageRating: any = await Ratings.findOne({
			attributes: [
				[sequelize.fn("AVG", sequelize.col("rating")), "averageRating"],
			],
			where: {
				portfolio_id: portfolio.id,
			},
		});

		const avgRating = averageRating?.get("averageRating") | 10;
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
						exclude: ["password", "role", "createdAt", "updatedAt"],
					},
				},
			],
		});

		const portfoliosWithAverageRating = await getPortfoliosWithRatings(
			portfolios
		);

		res.status(200).json({
			message: "Get all portfolios",
			success: true,
			data: portfoliosWithAverageRating,
		});
	} catch (error: any) {
		handleServerError(res, error);
	}
}

export async function createPortfolio(
	req: Request,
	res: Response<APIResponse>
) {
	try {
		const authHeader: any = req.headers.authorization;

		const user: any = getUserFromToken(authHeader);

		if (!user)
			return res
				.status(200)
				.json({ message: "Token not found auth header", success: false });

		let portfolioBody: PortfolioDocument = req.body;

		const portfolioCreated = await Portfolio.create({
			...portfolioBody,
			created_by: user.id,
		});

		res.status(201).json({
			message: "Portfolio created",
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
			message: "Portfolio found",
			success: true,
			data: portfolioFound,
		});
	} catch (error) {
		handleServerError(res, error);
	}
}

export async function deletePortfolio(
	req: Request,
	res: Response<APIResponse>
) {
	try {
		const portfolioId = req.params.id;
		const portfolioDeleted = await Portfolio.destroy({
			where: { id: portfolioId },
		});
		res.status(200).json({
			message: "Portfolio deleted",
			success: true,
			data: portfolioDeleted,
		});
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
			message: "Portfolio edited",
			success: true,
			data: portfolioEdited,
		});
	} catch (error) {
		handleServerError(res, error);
	}
}
