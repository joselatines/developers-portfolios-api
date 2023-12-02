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
import { upload } from "../../multer.config";

const router = express.Router();

router.get("/me", isAuthenticatedMiddleware, getAllPortfoliosFromCurrentUser);
router.get("/", getAllPortfolios);
router.get("/:id", getPortfolio);
router.post(
	"/",
	isAuthenticatedMiddleware,
	upload.single("files"),
	createPortfolio
);
router.put("/:id", isAuthenticatedMiddleware, editPortfolio);
router.delete("/:id", isAuthenticatedMiddleware, deletePortfolio);

export default router;
