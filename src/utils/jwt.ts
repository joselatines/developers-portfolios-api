import jwt from "jsonwebtoken";
import { envConfig } from "../dotenv/config";
const { JWT_SECRET } = envConfig;

interface IData {
	userId: string;
	role: string;
}

export function generateAccessToken(
	secretData: IData,
	expiresIn = "1h"
): string {
	return jwt.sign(secretData, JWT_SECRET, {
		expiresIn,
	});
}

export function verifyToken(token: string) {
	try {
		const decoded = jwt.verify(token, JWT_SECRET);
		return decoded;
	} catch (error) {
		console.error(error);
		return null;
	}
}

export function getUserFromToken(authHeader: string) {
	// authHeader: Bearer a4sdf68a4sf68a4s6df4a6s4df6
	const token = authHeader.split(" ")[1];

	return verifyToken(token);
}
