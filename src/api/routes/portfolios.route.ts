import express from "express";
import {
	getAllPortfolios,
	createPortfolio,
	deletePortfolio,
	editPortfolio,
	getPortfolio,
} from "../controllers/portfolios.controller";
import { isAdminMiddleware } from "../middlewares/is-admin.middleware";
import { isAuthenticatedMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", getAllPortfolios);
router.get("/:id", getPortfolio);
router.post("/", createPortfolio);
router.put("/:id", editPortfolio);
router.delete("/:id", deletePortfolio);

export default router;
