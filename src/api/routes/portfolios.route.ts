import express from 'express';
import {
  getPortfolios,
  createPortfolio,
  deletePortfolio,
  editPortfolio,
  getPortfolio,
} from '../controllers/portfolios.controller';
import { isAuthenticatedMiddleware } from '../middlewares/auth.middleware';
import { multerMiddleware } from '../middlewares/multer.middleware';

const router = express.Router();

router.get('/', getPortfolios);
router.get('/:id', getPortfolio);
router.post('/', isAuthenticatedMiddleware, multerMiddleware, createPortfolio);
router.put('/:id', isAuthenticatedMiddleware, multerMiddleware, editPortfolio);
router.delete('/:id', isAuthenticatedMiddleware, deletePortfolio);

export default router;
