import { Request, Response } from "express";
import { Session } from "express-session";
import APIResponse from "../../interfaces/responses/APIResponse";
import { User, UserDocument } from "../../database/models/user.model";
import { handleServerError } from "../../errors/server.error";
import { getUserFromToken } from "../../utils/jwt";

export async function getUserProfileData(
	req: Request,
	res: Response<APIResponse>
) {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader)
			return res.status(401).json({
				message: "Authorization header doesn't exits",
				success: false,
			});
		const userJWT = getUserFromToken(authHeader) as any;
		if (!userJWT)
			return res.status(401).json({
				message: "JWT user is not valid",
				success: false,
			});
		const userFound = await User.findOne({ where: { email: userJWT.email } });

		res
			.status(200)
			.json({ message: "My data", success: true, data: userFound });
	} catch (error) {
		handleServerError(res, error);
	}
}

export async function getAllUsers(req: Request, res: Response<APIResponse>) {
	try {
		const users = await User.findAll();
		res
			.status(200)
			.json({ message: "Get all users", success: true, data: users });
	} catch (error) {
		handleServerError(res, error);
	}
}

export async function createUser(req: Request, res: Response<APIResponse>) {
	try {
		const user = req.body;
		const userCreated = await User.create(user);
		res
			.status(201)
			.json({ message: "User created", success: true, data: userCreated });
	} catch (error) {
		handleServerError(res, error);
	}
}

export async function getUser(req: Request, res: Response<APIResponse>) {
	try {
		const userId = req.params.id;
		const userFound = await User.findByPk(userId);
		res
			.status(200)
			.json({ message: "User found", success: true, data: userFound });
	} catch (error) {
		handleServerError(res, error);
	}
}

export async function deleteUser(req: Request, res: Response<APIResponse>) {
	try {
		const userId = req.params.id;
		const userDeleted = await User.destroy({ where: { id: userId } });
		res
			.status(200)
			.json({ message: "User deleted", success: true, data: userDeleted });
	} catch (error) {
		handleServerError(res, error);
	}
}

export async function editUser(req: Request, res: Response<APIResponse>) {
	try {
		const userId = req.params.id;
		const user: UserDocument = req.body;
		const userEdited = await User.update(user, {
			where: { id: userId },
			returning: true,
		});
		res
			.status(200)
			.json({ message: "User edited", success: true, data: userEdited[1][0] });
	} catch (error) {
		handleServerError(res, error);
	}
}
