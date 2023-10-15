import * as dotenv from "dotenv";
import { join } from "path";

dotenv.config({ path: join(__dirname, "..", "..", ".env") });

interface EnvVariables {
	DB_USER: string;
	DB_PASSWORD: string;
	DB_COLLECTION: string;
	PORT: number | 3000;
	JWT_SECRET: string;
	ADMIN_ROLE: string;
}

const getConfig = (): EnvVariables => {
	const { DB_USER, DB_PASSWORD, DB_COLLECTION, PORT, JWT_SECRET, ADMIN_ROLE } = process.env;
	const parsedPort = Number(PORT);

	if (!DB_USER || !DB_PASSWORD || !DB_COLLECTION || !JWT_SECRET || !ADMIN_ROLE) {
		throw new Error("Missing required environment variables in config.env");
	}

	return {
		DB_USER,
		DB_PASSWORD,
		DB_COLLECTION,
		PORT: parsedPort,
		JWT_SECRET,
		ADMIN_ROLE
	};
};

export const envConfig = getConfig();
