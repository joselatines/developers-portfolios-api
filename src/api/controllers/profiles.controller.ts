import { Request, Response } from "express";
import APIResponse from "../../interfaces/responses/APIResponse";
import { Portfolio } from "../../database/models/portfolio.model";
import { getUserFromToken } from "../../utils/jwt";
import { handleServerError } from "../../errors/server.error";
import { User } from "../../database/models/user.model";
import { getPortfoliosWithRatings } from "./portfolios.controller";

export async function getLoggedUserProfile(
	req: Request,
	res: Response<APIResponse>
) {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			return res.status(401).json({
				message: "Authorization header doesn't exist",
				success: false,
			});
		}

		const { email, id } = getUserFromToken(authHeader) as any;
		const profile = await buildProfile(email, id);

		res.status(200).json({
			message: "My data",
			success: true,
			data: profile,
		});
	} catch (error) {
		handleServerError(res, error);
	}
}

export async function getProfile(req: Request, res: Response<APIResponse>) {
	try {
		const userId = req.params.id;
		const userFound = await User.findByPk(userId);

		if (!userFound) {
			return res.status(200).json({
				message: "User not found in the database. Please provide a valid ID.",
				success: false,
			});
		}

		const profile = await buildProfile(
			userFound.dataValues.email,
			userFound.dataValues.id
		);

		res.status(200).json({
			message: "Profile information",
			success: true,
			data: profile,
		});
	} catch (error) {
		handleServerError(res, error);
	}
}

const buildProfile = async (email: string, id: string) => {
	const user = await User.findOne({
		where: { email },
		attributes: {
			exclude: ["password"],
		},
	});

	const portfolios = await Portfolio.findAll({
		order: [
			["updatedAt", "ASC"],
			["createdAt", "ASC"],
		],
		where: { created_by: id },
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

	const data = {
		...user?.dataValues,
		portfolios: portfoliosWithAverageRating,
	};

	return data;
};
