import express from "express";
import {
	getAllUsers,
	createUser,
	deleteUser,
	editUser,
	getUser,
} from "../controllers/users.controller";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

export default router;
