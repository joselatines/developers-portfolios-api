import mongoose, { Schema, Document } from "mongoose";

interface UserDocument extends Document {
	username: string;
	email: string;
	password: string;
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
	},
	{
		// Other model options go here
	}
);

export const User = mongoose.model<UserDocument>("User", userSchema);


