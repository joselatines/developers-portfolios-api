import mongoose, { Schema, Document } from "mongoose";
import { PortfolioDocument } from "./portfolio.model";
import { UserDocument } from "./user.model";

export interface RatingsDocument extends Document {
	rating: number;
	portfolio_id: PortfolioDocument;
	user_id: UserDocument;
}

const ratingsSchema = new Schema<RatingsDocument>({
	rating: {
		type: Number,
		required: true,
	},
	portfolio_id: {
		type: Schema.Types.ObjectId,
		ref: "Portfolio",
		required: true,
	},
	user_id: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

export const Ratings = mongoose.model<RatingsDocument>(
	"Ratings",
	ratingsSchema
);
