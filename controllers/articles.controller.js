import db from '../bd.js';


// Récupérer tous les articles
export const getArticles = (req, res) => {
    const articles = db.prepare("SELECT * FROM articles").all();
   res.json(articles);
};
// Récupérer un article par son id
export const getArticleById = (req, res) => {
    const { id } = req.params;
    const article = db.prepare("SELECT * FROM articles WHERE id = ?").get(id);
    if (!article) {
        return res.status(404).json({ error: "Article not found" });
    }
   res.json(article);
};

//créer un nouvel article en verifiant que l'auteur existe
export const createArticle = (req, res) => {
    const { title, content, author_id } = req.body
    const author = db.prepare("SELECT * FROM authors WHERE id = ?").get(author_id);

    if (!author) {return res.status(400).json({ error: "Author not found" })}

    db.prepare(`INSERT INTO articles (title, content, author_id) VALUES (?, ?, ?)`).run(title, content, author_id);
    res.json({ message: "Article created successfully!" });
}


//supprimer un article en verifiant que l'article existe
export const deleteArticle = (req, res) => {
    const { id } = req.params;
    const article = db.prepare("SELECT * FROM articles WHERE id = ?").get(id);
    if (!article) {
        return res.status(404).json({ error: "Article not found" });
    }
    db.prepare(`DELETE FROM articles WHERE id = ?`).run(id);
    res.json({ message: "Article deleted successfully!" });
}

//modifier un article en verifiant que l'article existe et que l'auteur existe
export const putArticle = (req, res) => {
    const { id } = req.params;
    const { title, content, author_id } = req.body;
    const article = db.prepare("SELECT * FROM articles WHERE id = ?").get(id);
    const author = db.prepare("SELECT * FROM authors WHERE id = ?").get(author_id);

    if (!article) {
        return res.status(404).json({ error: "Article not found" });
    }
    if (!author) {
        return res.status(400).json({ error: "Author not found" });
    }

    db.prepare(`UPDATE articles SET title = ?, content = ?, author_id = ? WHERE id = ?`).run(title, content, author_id, id);
    res.json({ message: "Article updated successfully!" });
}

// recuperer tous les articles avec le nom de l'auteur jointure
export const getArticlesWithAuthor = (req, res) => {
    const articles = db.prepare(`
        SELECT articles.title, articles.content, authors.name AS author FROM articles
        JOIN authors ON articles.author_id = authors.id
    `).all();
    res.json(articles);
}

