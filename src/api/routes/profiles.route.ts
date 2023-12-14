import express from "express";
import { isAuthenticatedMiddleware } from "../middlewares/auth.middleware";
import {
	getLoggedUserProfile,
	getProfile,
} from "../controllers/profiles.controller";

const router = express.Router();

router.get("/me", isAuthenticatedMiddleware, getLoggedUserProfile);
router.get("/:id", getProfile);

export default router;
