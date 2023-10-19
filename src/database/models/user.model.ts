import { DataTypes, UUID } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../connection";
import { envConfig } from "../../dotenv/config";
const { ADMIN_ROLE } = envConfig;

export interface UserDocument {
	username: string;
	email: string;
	password: string;
	role: typeof ADMIN_ROLE | "user";
	id: string;
}

export const User = sequelize.define("User", {
	id: {
		type: UUID,
		defaultValue: uuidv4(),
		primaryKey: true,
	},
	username: {
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
});
