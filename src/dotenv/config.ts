import * as dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '..', '..', '.env') });

interface EnvVariables {
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  PORT: number | 3000;
  JWT_SECRET: string;
  ADMIN_ROLE: string;
  GITHUB_CLIENT_SECRET: string;
  GITHUB_CLIENT_ID: string;
  NODE_ENV: string;
  PRODUCTION_URL: string;
  DB_HOST: string;

  TYPE: string;
  PROJECT_ID: string;
  PRIVATE_KEY_ID: string;
  PRIVATE_KEY: string;
  CLIENT_EMAIL: string;
  CLIENT_ID: string;
  AUTH_URI: string;
  TOKEN_URI: string;
  AUTH_PROVIDER_X509_CERT_URL: string;
  CLIENT_X509_CERT_URL: string;
  UNIVERSE_DOMAIN: string;
  STORAGEBUCKET: string;
}

const getConfig = (): EnvVariables => {
  const {
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    PORT,
    JWT_SECRET,
    ADMIN_ROLE,
    GITHUB_CLIENT_SECRET,
    GITHUB_CLIENT_ID,
    PRODUCTION_URL,
    DB_HOST,
    TYPE,
    PROJECT_ID,
    PRIVATE_KEY_ID,
    PRIVATE_KEY,
    CLIENT_EMAIL,
    CLIENT_ID,
    AUTH_URI,
    TOKEN_URI,
    AUTH_PROVIDER_X509_CERT_URL,
    CLIENT_X509_CERT_URL,
    UNIVERSE_DOMAIN,
    STORAGEBUCKET,
  } = process.env;
  const parsedPort = Number(PORT);
  // TODO: REFACTOR
  if (
    !DB_USER ||
		!DB_PASSWORD ||
		!DB_NAME ||
		!DB_HOST ||
		!JWT_SECRET ||
		!ADMIN_ROLE ||
		!GITHUB_CLIENT_ID ||
		!GITHUB_CLIENT_SECRET ||
		!PRODUCTION_URL ||

    !TYPE ||
    !PROJECT_ID ||
    !PRIVATE_KEY_ID ||
    !PRIVATE_KEY ||
    !CLIENT_EMAIL ||
    !CLIENT_ID ||
    !AUTH_URI ||
    !TOKEN_URI ||
    !AUTH_PROVIDER_X509_CERT_URL ||
    !CLIENT_X509_CERT_URL ||
    !UNIVERSE_DOMAIN ||
    !STORAGEBUCKET
  ) {
    throw new Error('Missing required environment variables in config.env');
  }

  return {
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    PORT: parsedPort,
    JWT_SECRET,
    ADMIN_ROLE,
    GITHUB_CLIENT_SECRET,
    GITHUB_CLIENT_ID,
    NODE_ENV: 'development',
    PRODUCTION_URL,
    DB_HOST,
    TYPE,
    PROJECT_ID,
    PRIVATE_KEY_ID,
    PRIVATE_KEY,
    CLIENT_EMAIL,
    CLIENT_ID,
    AUTH_URI,
    TOKEN_URI,
    AUTH_PROVIDER_X509_CERT_URL,
    CLIENT_X509_CERT_URL,
    UNIVERSE_DOMAIN,
    STORAGEBUCKET,
  };
};

export const envConfig = getConfig();
