import express from 'express';
import { signUpController } from '../controllers/auth/signup.controller';
import { loginController } from '../controllers/auth/login.controller';
import {
  githubLogin,
  githubLoginCallback,
} from '../controllers/auth/github.controller';
import passport from 'passport';
import { logoutController } from '../controllers/auth/logout.controllers';

const router = express.Router();

router.post('/signup', signUpController);
router.post('/login', loginController);
router.get('/logout', logoutController);

router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] }),
  githubLogin,
);
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  githubLoginCallback,
);

export default router;
