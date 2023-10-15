import express from "express";
import {
	getAllUsers,
	createUser,
	deleteUser,
	editUser,
	getUser,
} from "../controllers/users.controller";
import { isAdminMiddleware } from "../middlewares/is-admin.middleware";
import { isAuthenticatedMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", isAuthenticatedMiddleware, getAllUsers);
router.get("/:id", getUser);
router.post("/", isAdminMiddleware, createUser);
router.put("/:id", isAdminMiddleware, editUser);
router.delete("/:id", isAdminMiddleware, deleteUser);

export default router;
