import express from "express";
import {
	createRating,
	deleteRating,
	getAllRatings,
} from "../controllers/ratings.controller";

const router = express.Router();

router.get("/", getAllRatings);
router.post("/", createRating);
router.delete("/:id", deleteRating);

export default router;
