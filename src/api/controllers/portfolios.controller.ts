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

export async function getAllPortfoliosFromCurrentUser(
	req: Request,
	res: Response<APIResponse>
) {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader)
			return res.status(401).json({
				message: "Authorization header doesn't exits",
				success: false,
			});
		const userJWT = getUserFromToken(authHeader) as any;
		if (!userJWT)
			return res.status(401).json({
				message: "JWT user is not valid",
				success: false,
			});

		let portfolios: any = await Portfolio.findAll({
			include: [
				{
					model: User,
					attributes: {
						exclude: ["password", "role", "createdAt", "updatedAt"],
					},
				},
			],
		});

		if (portfolios.length > 0) {
			portfolios = portfolios.map((portfolio: any) => {
				return { ...portfolio.toJSON(), images: portfolio?.images.split(", ") };
			});
		}

		res.status(200).json({
			message: "Get all my portfolios",
			success: true,
			data: portfolios,
		});
	} catch (error) {
		handleServerError(res, error);
	}
}

export async function getAllPortfolios(
	req: Request,
	res: Response<APIResponse>
) {
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

		const portfolioPromises = portfolios.map(async (portfolio: any) => {
			const averageRating: any = await Ratings.findOne({
				attributes: [
					[sequelize.fn("AVG", sequelize.col("rating")), "averageRating"],
				],
				where: {
					portfolio_id: portfolio.id,
				},
			});

			return {
				...portfolio.toJSON(),
				images: portfolio.images.split(", "),
				avg_rating: Number(averageRating?.get("averageRating").toFixed(2)),
			};
		});

		// Use Promise.all to asynchronously fetch average ratings for each portfolio
		const portfoliosWithAverageRating = await Promise.all(portfolioPromises);

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

		// parsing array to save it into sqlite db
		const images = portfolioBody.images.join(", ");

		const portfolioCreated = await Portfolio.create({
			...portfolioBody,
			images,
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
