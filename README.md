# API Backend — TP Final

## Installation

```bash
npm install
node server.js
```

## Structure du projet
├── server.js
├── bd.js
├── middlewares/
│   ├── validatation.js
│   └── logger.js
├── routes/
│   ├── authors.route.js
│   └── articles.route.js
└── controllers/
├── authors.controller.js
└── articles.controller.js

## Routes et exemples

### 👤 Authors

**GET /authors** — Récupérer tous les auteurs
```json
// Réponse
[
    { "id": 1, "name": "Koura Soumare" },
    { "id": 2, "name": "Djelika Diarra" }
]
```

**POST /authors** — Créer un auteur
```json
// Body
{ "name": "Victor Hugo" }

// Réponse succès
{ "message": "Auteur créé !" }

// Réponse erreur (name manquant)
{ "error": "Name is required" }
```

**GET /authors/:id/articles** — Articles d'un auteur
```json
// Réponse
[
    { "id": 1, "title": "Article 1", "content": "...", "author": "Koura Soumare" }
]

// Réponse erreur (auteur inexistant)
{ "error": "Author not found" }
```

**DELETE /authors/:id** — Supprimer un auteur
```json
// Réponse succès
{ "message": "Author deleted successfully!" }

// Réponse erreur (auteur a des articles)
{ "error": "Author has articles, cannot be deleted" }
```

---

### 📚 Articles

**GET /articles** — Récupérer tous les articles
```json
// Réponse
[
    { "id": 1, "title": "Article 1", "content": "...", "author_id": 1 }
]
```

**GET /articles/with-author** — Articles avec nom de l'auteur
```json
// Réponse
[
    { "id": 1, "title": "Article 1", "content": "...", "author": "Koura Soumare" }
]
```

**GET /articles/:id** — Récupérer un article
```json
// Réponse succès
{ "id": 1, "title": "Article 1", "content": "...", "author_id": 1 }

// Réponse erreur (id inexistant)
{ "error": "Article not found" }
```

**POST /articles** — Créer un article
```json
// Body
{ "title": "Mon article", "content": "Contenu...", "author_id": 1 }

// Réponse succès
{ "message": "Article created successfully!" }

// Réponse erreur (champ manquant)
{ "error": "title est obligatoire" }

// Réponse erreur (auteur inexistant)
{ "error": "Author not found" }
```

**PUT /articles/:id** — Modifier un article
```json
// Body
{ "title": "Titre modifié", "content": "Contenu modifié", "author_id": 1 }

// Réponse succès
{ "message": "Article updated successfully!" }

// Réponse erreur (id inexistant)
{ "error": "Article not found" }
```

**DELETE /articles/:id** — Supprimer un article
```json
// Réponse succès
{ "message": "Article deleted successfully!" }

// Réponse erreur (id inexistant)
{ "error": "Article not found" }
```