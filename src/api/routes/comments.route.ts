import express from "express";
import { getAllComments } from "../controllers/comments.controller";
import { deleteRating } from "../controllers/ratings.controller";

const router = express.Router();

router.get("/", getAllComments);
router.delete("/:id", deleteRating);

export default router;
