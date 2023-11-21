import { Request, Response } from "express";
import APIResponse from "../../../interfaces/responses/APIResponse";
import { User, UserDocument } from "../../../database/models/user.model";
import { compareEncrypted } from "../../../utils/helpers";
import { generateAccessToken } from "../../../utils/jwt";
import { handleServerError } from "../../../errors/server.error";

export async function loginController(
	req: Request,
	res: Response<APIResponse>
) {
	const { email, password } = req.body;

	try {
		// Check if the user exists in the database
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return res.status(200).json({
				message: "Invalid email or password",
				success: false,
			});
		}
		const userData: UserDocument = user.dataValues;

		// Check if the password is correct(same)
		const isPasswordValid = await compareEncrypted(password, userData.password);

		if (!isPasswordValid) {
			return res.status(200).json({
				message: "Invalid email or password",
				success: false,
			});
		}

		// Creating a JWT token
		const token = generateAccessToken({
			id: userData.id,
			role: userData.role,
			email,
		});

		res.status(200).json({
			message: "Login successful",
			success: true,
			data: { ...user.dataValues, token },
		});
	} catch (error) {
		handleServerError(res, error);
	}
}
