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
router.post("/", createUser);
router.get("/:id", getUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

export default router;
