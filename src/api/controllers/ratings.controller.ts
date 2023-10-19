import { Request, Response } from "express";
import APIResponse from "../../interfaces/responses/APIResponse";
import { Ratings, RatingsDocument } from "../../database/models/rating.model";
import { getUserFromToken } from "../../utils/jwt";

const handleServerError = (res: Response, error: any) => {
	res
		.status(500)
		.json({ message: "Internal Server Error", success: false, error });
};

const parseRating = (rating: number): number => Math.min(rating, 10);

// TODO: is not working idk why i think its cause model
export async function getAllRatings(req: Request, res: Response<APIResponse>) {
	try {
		const ratings = await Ratings.find()
		res
			.status(200)
			.json({ message: "Get all ratings", success: true, data: ratings });
	} catch (error) {
		handleServerError(res, error);
	}
}

export async function createRatings(req: Request, res: Response<APIResponse>) {
	try {
		const token = req.headers.authorization;
		if (!token) {
			return res.status(500).json({
				message: "You need to pass a token to the auth header",
				success: false,
			});
		}

		const user: any = getUserFromToken(token);
		if (!user) {
			return res
				.status(500)
				.json({ message: "User not on auth header", success: false });
		}

		const ratingBody: RatingsDocument = req.body;

		const ratingCreated = await Ratings.create({
			...ratingBody,
			rating: parseRating(ratingBody.rating),
			user_id: user.id,
		});

		res.status(201).json({
			message: "Ratings created",
			success: true,
			data: ratingCreated,
		});
	} catch (error) {
		handleServerError(res, error);
	}
}
