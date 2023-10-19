import { Response } from "express";

export const handleServerError = (res: Response, error: any) => {
	res
		.status(500)
		.json({ message: "Internal Server Error", success: false, error });
};
