import express from "express";
import {
	createRatings,
	getAllRatings,
} from "../controllers/ratings.controller";

const router = express.Router();

router.get("/", getAllRatings);
router.post("/", createRatings);

export default router;
