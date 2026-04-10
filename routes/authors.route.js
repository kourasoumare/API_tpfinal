import express from 'express';
import { getAuthors, createAuthor, getArticlesByAuthor, deleteAuthor } from '../controllers/authors.controller.js';
import { validateAuthor } from '../middlewares/validatation.js';


const router = express.Router();

// Route pour récupérer tous les auteurs
router.get('/', getAuthors);

// Route pour créer un nouvel auteur avec la validation du middleware
router.post('/', validateAuthor, createAuthor);

// Route pour récupérer tous les articles d'un auteur donné bonus
router.get('/:author_id/articles', getArticlesByAuthor);

// route pour supprimer un auteur en verifiant que l'auteur n'a pas d'article bonus
router.delete('/:id', deleteAuthor);

export default router;  