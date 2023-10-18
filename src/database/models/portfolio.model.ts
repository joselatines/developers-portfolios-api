import mongoose, { Schema, Document } from "mongoose";
import { UserDocument } from "./user.model";
const PORTFOLIO_TYPES = {
	backend: "backend",
	frontend: "frontend",
	fullstack: "fullstack",
	mobile: "mobile",
	software: "software",
} as const;

type IPortfolioType = keyof typeof PORTFOLIO_TYPES;

export interface PortfolioDocument extends Document {
	images: string[];
	created_by: UserDocument;
	website_link: string;
	type: IPortfolioType;
	title: string;
	description: string;
}

const portfolioSchema = new Schema<PortfolioDocument>({
	images: {
		type: [String],
		required: true,
	},
	created_by: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	website_link: {
		type: String,
		required: true,
	},
	title: { type: String, required: true },
	description: { type: String },
	type: {
		type: String,
		enum: Object.values(PORTFOLIO_TYPES), // Enforce the type to be one of the specified values
		default: "frontend",
	},
});

export const Portfolio = mongoose.model<PortfolioDocument>(
	"Portfolio",
	portfolioSchema
);
