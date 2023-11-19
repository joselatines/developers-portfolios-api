import { NextFunction, Request, Response } from "express";
import APIResponse from "../../interfaces/responses/APIResponse";
import { getUserFromToken } from "../../utils/jwt";

export function isAuthenticatedMiddleware(
	req: Request,
	res: Response<APIResponse>,
	next: NextFunction
) {
	const authorizationHeader = req.headers.authorization;

	if (!authorizationHeader || authorizationHeader.length === 0) {
		return res.status(400).json({
			message: "No authorization header",
			success: false,
		});
	}

	try {
		const user: any = getUserFromToken(authorizationHeader);

		if (user && user.role === "user") {
			next();
		} else {
			res.status(403).json({
				message: "You need to authenticate yourself to use this route",
				success: false,
			});
		}
	} catch (error) {
		res.status(401).json({
			message: "Invalid token",
			success: false,
		});
	}
}
