import { NextFunction, Request, Response } from "express";
import APIResponse from "../../interfaces/responses/APIResponse";
import { getUserFromToken } from "../../utils/jwt";

export function isAuthenticatedMiddleware(
	req: Request,
	res: Response<APIResponse>,
	next: NextFunction
) {
	if (!req.headers.authorization || req.headers.authorization?.length < 0)
		return res
			.status(400)
			.json({ message: "Not authorization header", success: false });

	// TODO: typo problem
	const user: any = getUserFromToken(req.headers.authorization);

	if (user && user.role === "user") {
		console.info("user user...");
		next();
	} else {
		res
			.status(403)
			.json({
				message: "You need to authenticate yourself to use this route",
				success: false,
			});
	}
}
