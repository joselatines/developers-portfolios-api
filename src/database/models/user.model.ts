import { DataTypes, UUID, UUIDV4 } from "sequelize";

import { sequelize } from "../connection";
import { envConfig } from "../../dotenv/config";
const { ADMIN_ROLE } = envConfig;

export interface UserDocument {
	githubUsername: string;
	email: string;
	password: string;
	role: typeof ADMIN_ROLE | "user";
	id: string;
	github: string;
	profilePic: string;
	provider: string;
}

export const User = sequelize.define("User", {
	id: {
		type: UUID,
		defaultValue: UUIDV4,
		primaryKey: true,
	},
	githubUsername: {
		type: DataTypes.STRING,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
	},
	role: {
		type: DataTypes.STRING,
		defaultValue: "user",
	},
	profilePic: {
		type: DataTypes.STRING,
	},
	provider: {
		type: DataTypes.STRING,
	},
});
