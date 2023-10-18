import mongoose, { Schema, Document } from "mongoose";
import { envConfig } from "../../dotenv/config";
const { ADMIN_ROLE } = envConfig;

export interface UserDocument extends Document {
	username: string;
	email: string;
	password: string;
	role: typeof ADMIN_ROLE | "user";
}

const userSchema = new Schema<UserDocument>(
	{
		username: {
			type: String,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
		},
		role: {
			type: String,
			default: "user",
		},
	},
	{
		// Other model options go here
	}
);

export const User = mongoose.model<UserDocument>("User", userSchema);
