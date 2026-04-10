
//middleware de validation pour les auteurs

export const validateAuthor = (req, res, next) => {
    const { name } = req.body;
    if (!name ){
        return res.status(400).json({ error: "Name is required" });
    }
    next();
}

//middleware de validation pour les articles

export const validateArticle = (req, res, next) => {
    const { title, content, author_id } = req.body

    if (!title) return res.status(400).json({ error: "title est obligatoire" })
    if (!content) return res.status(400).json({ error: "content est obligatoire" })
    if (!author_id) return res.status(400).json({ error: "author_id est obligatoire" })

    next()
}