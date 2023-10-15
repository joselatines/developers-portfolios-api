import { IUser } from "./users.interface";

export const PORTFOLIO_TYPES = {
	backend: "backend",
	frontend: "frontend",
	fullstack: "fullstack",
	mobile: "mobile",
	software: "software",
} as const;

export type PortfolioType = keyof typeof PORTFOLIO_TYPES;

export interface ICreatePortfolio {
	images: string[];
	created_by: IUser;
	website_link: string;
	type: PortfolioType;
	title: string;
	description: string;
}
