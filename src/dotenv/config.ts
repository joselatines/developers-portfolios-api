import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '..', '..', '.env') });

interface EnvVariables {
  DB_USER: string;
  DB_PASSWORD: string;
  DB_COLLECTION: string;
  PORT: number | 3000;
  JWT_SECRET: string;
  ADMIN_ROLE: string;
  GITHUB_CLIENT_SECRET: string;
  GITHUB_CLIENT_ID: string;
  NODE_ENV: string;
  PRODUCTION_URL: string;
}

const getConfig = (): EnvVariables => {
  const {
    DB_USER,
    DB_PASSWORD,
    DB_COLLECTION,
    PORT,
    JWT_SECRET,
    ADMIN_ROLE,
    GITHUB_CLIENT_SECRET,
    GITHUB_CLIENT_ID,
    PRODUCTION_URL,
  } = process.env;
  const parsedPort = Number(PORT);
  // TODO: REFACTOR
  if (
    !DB_USER ||
		!DB_PASSWORD ||
		!DB_COLLECTION ||
		!JWT_SECRET ||
		!ADMIN_ROLE ||
		!GITHUB_CLIENT_ID ||
		!GITHUB_CLIENT_SECRET ||
		!PRODUCTION_URL
  ) {
    throw new Error('Missing required environment variables in config.env');
  }

  return {
    DB_USER,
    DB_PASSWORD,
    DB_COLLECTION,
    PORT: parsedPort,
    JWT_SECRET,
    ADMIN_ROLE,
    GITHUB_CLIENT_SECRET,
    GITHUB_CLIENT_ID,
    NODE_ENV: 'development',
    PRODUCTION_URL,
  };
};

export const envConfig = getConfig();
