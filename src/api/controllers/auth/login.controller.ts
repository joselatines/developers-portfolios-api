import { Request, Response } from "express";
import APIResponse from "../../../interfaces/responses/APIResponse";
import { User } from "../../../database/models/user.model";
import { compareEncrypted } from "../../../utils/helpers";
import { generateAccessToken } from "../../../utils/jwt";

export async function loginController(
	req: Request,
	res: Response<APIResponse>
) {
	const { email, password } = req.body;

	try {
		// Check if the user exists in the database
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json({
				message: "Invalid email or password",
				success: false,
			});
		}

		// Check if the password is correct(same)
		const isPasswordValid = await compareEncrypted(password, user.password);

		if (!isPasswordValid) {
			return res.status(401).json({
				message: "Invalid email or password",
				success: false,
			});
		}

		// Creating a JWT token
		const token = generateAccessToken({ userId: user._id, role: user.role });

		res.status(200).json({
			message: "Login successful",
			success: true,
			data: { user, token },
		});
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: "Internal Server Error", success: false, error });
	}
}
