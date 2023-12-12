import express from "express";
import {
	getAllPortfolios,
	createPortfolio,
	deletePortfolio,
	editPortfolio,
	getPortfolio,
	getAllPortfoliosFromCurrentUser,
} from "../controllers/portfolios.controller";
import { isAuthenticatedMiddleware } from "../middlewares/auth.middleware";
import { multerMiddleware } from "../middlewares/multer.middleware";

const router = express.Router();

router.get("/me", isAuthenticatedMiddleware, getAllPortfoliosFromCurrentUser);
router.get("/", getAllPortfolios);
router.get("/:id", getPortfolio);
router.post("/", isAuthenticatedMiddleware, multerMiddleware, createPortfolio);
router.put("/:id", isAuthenticatedMiddleware, multerMiddleware, editPortfolio);
router.delete("/:id", isAuthenticatedMiddleware, deletePortfolio);

export default router;
