import express from 'express';
import { getAllUsers } from '../controllers/users.controller';
import { signUpController } from '../controllers/auth/signup.controller';
import { loginController } from '../controllers/auth/login.controller';

const router = express.Router();

router.post('/signup', signUpController);
router.get('/login', loginController);
router.post('/logout', getAllUsers);

export default router;
