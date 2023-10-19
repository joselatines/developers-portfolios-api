import { Request, Response } from "express";
import APIResponse from "../../interfaces/responses/APIResponse";
import {
	Portfolio,
	PortfolioDocument,
} from "../../database/models/portfolio.model";
import { getUserFromToken } from "../../utils/jwt";
import { handleServerError } from "../../errors/server.error";
import { User } from "../../database/models/user.model";
import { Op } from "sequelize";
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

		res.status(200).json({
			message: "Get all portfolios",
			success: true,
			data: portfolios,
		});
	} catch (error) {
		handleServerError(res, error);
	}
}

export async function createPortfolio(
	req: Request,
	res: Response<APIResponse>
) {
	try {
		if (!req.headers.authorization)
			return res.status(500).json({
				message: "You need to pass a the token to the auth header",
				success: false,
			});

		const user: any = getUserFromToken(req.headers.authorization);

		if (!user)
			return res
				.status(500)
				.json({ message: "User not on auth header", success: false });

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
