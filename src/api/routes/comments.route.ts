import express from 'express';
import {
  getComments,
  getCommentsFromPortfolio,
} from '../controllers/comments.controller';
import { deleteRating } from '../controllers/ratings.controller';

const router = express.Router();

router.get('/', getComments);
router.get('/:id', getCommentsFromPortfolio);
router.delete('/:id', deleteRating);

export default router;
