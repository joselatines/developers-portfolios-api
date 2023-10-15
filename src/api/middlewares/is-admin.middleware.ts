import { NextFunction, Request, Response } from "express";
import APIResponse from "../../interfaces/responses/APIResponse";
import { getUserFromToken } from "../../utils/jwt";

export function isAdminMiddleware(
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

	if (user && user.role === "admin") {
		console.info("admin user...");
		next();
	} else {
		res
			.status(403)
			.json({ message: "You don't have access to this route", success: false });
	}
}
