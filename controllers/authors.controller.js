import db from '../bd.js';

// Récupérer tous les auteurs 
export const getAuthors = (req, res) => {
    const authors = db.prepare("SELECT * FROM authors").all();
   res.json(authors);
};

//créer un nouvel auteur
export const createAuthor = (req, res) => {
    const { name } = req.body
    db.prepare(`INSERT INTO authors (name) VALUES (?)`).run(name);
    res.json({ message: "Author created successfully!" });
}

// tous les articles d'un auteur donné en verifiant que l'auteur existe

export const getArticlesByAuthor = (req, res) => {
    const { author_id } = req.params;
    const author = db.prepare("SELECT * FROM authors WHERE id = ?").get(author_id);
    if (!author) {
        return res.status(404).json({ error: "Author not found" });
    }


const articles = db.prepare(`
        SELECT articles.id, articles.title, articles.content, authors.name AS author
        FROM articles
        JOIN authors ON articles.author_id = authors.id
        WHERE authors.id = ?
    `).all(author_id)
    res.json(articles);
}


//suppression securiser qui  verifie que l'auteur n'a pas d'article avant de le supprimer
export const deleteAuthor = (req, res) => {
    const { id } = req.params;
    const author = db.prepare("SELECT * FROM authors WHERE id = ?").get(id);    
    if (!author) {
        return res.status(404).json({ error: "Author not found" });
    }
    const articles = db.prepare("SELECT * FROM articles WHERE author_id = ?").all(id);
    if (articles.length > 0) {
        return res.status(400).json({ error: "Author has articles, cannot be deleted" });
    }
    db.prepare(`DELETE FROM authors WHERE id = ?`).run(id);
    res.json({ message: "Author deleted successfully!" });
}
