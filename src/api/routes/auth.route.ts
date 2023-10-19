import express from "express";
import { getAllUsers } from "../controllers/users.controller";
import { signUpController } from "../controllers/auth/signup.controller";
import { loginController } from "../controllers/auth/login.controller";
import {
	githubLogin,
	githubLoginCallback,
} from "../controllers/auth/github.controller";
import passport from "passport";

const router = express.Router();

router.post("/signup", signUpController);
router.get("/login", loginController);
router.post("/logout", getAllUsers);

router.get(
	"/github",
	passport.authenticate("github", { scope: ["user:email"] }),
	githubLogin
);
router.get(
	"/github/callback",
	passport.authenticate("github", { failureRedirect: "/login" }),
	githubLoginCallback
);

export default router;
