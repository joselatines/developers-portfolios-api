import { Request, Response } from "express";
import APIResponse from "../../interfaces/responses/APIResponse";
import { Ratings } from "../../database/models/rating.model";
import { handleServerError } from "../../errors/server.error";
import { User } from "../../database/models/user.model";
export async function getAllComments(req: Request, res: Response<APIResponse>) {
	try {
		let comments: any = await Ratings.findAll({
			order: [["updatedAt", "ASC"], ["createdAt", "ASC"]],
			attributes: { exclude: ["rated_by", "createdAt", "updatedAt"] },
			include: [
				{
					model: User,
					attributes: {
						exclude: ["password", "role", "createdAt", "updatedAt", "provider"],
					},
				},
			],
		});
		res
			.status(200)
			.json({ message: "Get all comments", success: true, data: comments });
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
			message: "Rating deleted",
			success: true,
			data: ratingDeleted,
		});
	} catch (error) {
		handleServerError(res, error);
	}
}
