import express from 'express';
import {getArticles, getArticleById, createArticle, deleteArticle, putArticle, getArticlesWithAuthor}
 from '../controllers/articles.controller.js';
import { validateArticle } from '../middlewares/validatation.js';

const router = express.Router();

router.get('/', getArticles);
router.get('/with-author', getArticlesWithAuthor);
router.get('/:id', getArticleById);
router.post('/', validateArticle, createArticle);
router.delete('/:id', deleteArticle);
router.put('/:id', validateArticle, putArticle);




export default router;