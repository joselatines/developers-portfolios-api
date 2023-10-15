import * as dotenv from "dotenv";
import { join } from "path";

dotenv.config({ path: join(__dirname, "..", "..", ".env") });

interface EnvVariables {
	DB_USER: string;
	DB_PASSWORD: string;
	DB_COLLECTION: string;
	PORT: number | undefined;
	JWT_SECRET: string;
}

const getConfig = (): EnvVariables => {
	const { DB_USER, DB_PASSWORD, DB_COLLECTION, PORT, JWT_SECRET } = process.env;
	const parsedPort = PORT ? Number(PORT) : undefined;

	if (!DB_USER || !DB_PASSWORD || !DB_COLLECTION || !JWT_SECRET) {
		throw new Error("Missing required environment variables in config.env");
	}

	return {
		DB_USER,
		DB_PASSWORD,
		DB_COLLECTION,
		PORT: parsedPort,
		JWT_SECRET,
	};
};

export const envConfig = getConfig();


