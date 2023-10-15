import { Request, Response } from "express";
import APIResponse from "../../interfaces/responses/APIResponse";
import { Portfolio } from "../../database/models/portfolio.model";
import { ICreatePortfolio } from "../../interfaces/portfolios.interface";

export async function getAllPortfolios(
	req: Request,
	res: Response<APIResponse>
) {
	try {
		const portfolios = await Portfolio.find({});
		res
			.status(200)
			.json({ message: "Get all portfolios", success: true, data: portfolios });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Internal Server Error", success: false, error });
	}
}

export async function createPortfolio(
	req: Request,
	res: Response<APIResponse>
) {
	try {
		const portfolio: ICreatePortfolio = req.body;
		const portfolioCreated = await Portfolio.create(portfolio);
		res
			.status(201)
			.json({ message: "Portfolio created", success: true, data: portfolioCreated });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Internal Server Error", success: false, error });
	}
}

export async function getPortfolio(req: Request, res: Response<APIResponse>) {
	try {
		const portfolioId = req.params.id;
		const portfolioFound = await Portfolio.findById(portfolioId);
		res
			.status(200)
			.json({ message: "Portfolio found", success: true, data: portfolioFound });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Internal Server Error", success: false, error });
	}
}

export async function deletePortfolio(
	req: Request,
	res: Response<APIResponse>
) {
	try {
		const portfolioId = req.params.id;
		const portfolioDeleted = await Portfolio.findByIdAndDelete(portfolioId);
		res
			.status(200)
			.json({ message: "Portfolio deleted", success: true, data: portfolioDeleted });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Internal Server Error", success: false, error });
	}
}

export async function editPortfolio(req: Request, res: Response<APIResponse>) {
	try {
		const portfolioId = req.params.id;
		const portfolio = req.body;
		const portfolioEdited = await Portfolio.findByIdAndUpdate(portfolioId, portfolio, {
			new: true,
		});
		res
			.status(200)
			.json({ message: "Portfolio edited", success: true, data: portfolioEdited });
	} catch (error) {
		res
			.status(500)
			.json({ message: "Internal Server Error", success: false, error });
	}
}
