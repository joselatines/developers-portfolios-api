import { Request, Response } from "express";
import APIResponse from "../../../interfaces/responses/APIResponse";
import { User } from "../../../database/models/user.model";
import { encrypt } from "../../../utils/helpers";
import { handleServerError } from "../../../errors/server.error";

export async function signUpController(
	req: Request,
	res: Response<APIResponse>
) {
	const { username, email, password } = req.body;

	try {
		// Check if the email is already registered
		const existingUser = await User.findOne({ where: { email } });
		if (existingUser) {
			return res.status(200).json({
				message: `${email} is already signed up. Please try logging in.`,
				success: false,
				data: {},
			});
		}

		const hashedPassword = await encrypt(password);

		// Create a new user
		const newUser = await User.create({
			username,
			email,
			password: hashedPassword,
		});

		res.status(200).json({
			message: "Sign up successful",
			success: true,
			data: { user: newUser },
		});
	} catch (error) {
		handleServerError(res, error);
	}
}
