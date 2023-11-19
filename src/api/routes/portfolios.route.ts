import express from 'express';
import {
  getAllPortfolios,
  createPortfolio,
  deletePortfolio,
  editPortfolio,
  getPortfolio,
  getAllPortfoliosFromCurrentUser,
} from '../controllers/portfolios.controller';
import { isAuthenticatedMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/me',isAuthenticatedMiddleware, getAllPortfoliosFromCurrentUser);
router.get('/', getAllPortfolios);
router.get('/:id', getPortfolio);
router.post('/', isAuthenticatedMiddleware, createPortfolio);
router.put('/:id', editPortfolio);
router.delete('/:id', deletePortfolio);

export default router;
