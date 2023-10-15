import mongoose, { Schema, Document } from "mongoose";
import { envConfig } from "../../dotenv/config";
import { IUser } from "../../interfaces/users.interface";
import {
	PORTFOLIO_TYPES,
	PortfolioType,
} from "../../interfaces/portfolios.interface";

interface PortfolioDocument extends Document {
	images: string[];
	created_by: IUser;
	website_link: string;
	type: PortfolioType;
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
