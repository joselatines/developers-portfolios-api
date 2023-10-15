import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import usersRoutes from "./api/routes/users.route";
import authRoutes from "./api/routes/auth.route";
import portfoliosRoutes from "./api/routes/portfolios.route";
import { errorHandlerMiddleware } from "./api/middlewares/error-handler";
import { notFoundMiddleware } from "./api/middlewares/not-found";
import { connectDb } from "./database/connection";
import { User } from "./database/models/user.model";
require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

connectDb();

app.get("/", (req, res) => {
	res.json({
		message: "✨👋🌎",
	});
});

app.get("/api/v1", (req, res) => {
	res.json({
		message: "Welcome my api 👋",
	});
});

app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/portfolios", portfoliosRoutes);
app.use("/api/v1/auth", authRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;
