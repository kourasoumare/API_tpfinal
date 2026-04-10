import Database from "better-sqlite3";
const db = new Database("database.db");
console.log("Database connected successfully!");
// creation de la table authors

db.prepare(`
  CREATE TABLE IF NOT EXISTS authors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  )
`).run();


// creation de la table articles  

db.prepare(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT,
    author_id INTEGER,
    FOREIGN KEY (author_id) REFERENCES authors(id)
  )
`).run();



// insertion de données dans la table authors
/*
db.prepare(`INSERT INTO authors (name) VALUES (?)`).run("Koura Soumare");
db.prepare(`INSERT INTO authors (name) VALUES (?)`).run("Djelika Diarra");
db.prepare(`INSERT INTO authors (name) VALUES (?)`).run("Djeneba Ongoiba");
*/


//insertion de données dans la table articles
/*
db.prepare(`INSERT INTO articles (title, content, author_id) VALUES (?, ?, ?)`).run("Article 1", "Content of article 1", 1);
db.prepare(`INSERT INTO articles (title, content, author_id) VALUES (?, ?, ?)`).run("Article 2", "Content of article 2", 2);
db.prepare(`INSERT INTO articles (title, content, author_id) VALUES (?, ?, ?)`).run("Article 3", "Content of article 3", 3);
*/
//test pour voir si les données ont été insérées correctement
console.log(" inserted successfully!");

const authors = db.prepare("SELECT * FROM authors").all()
console.log(authors)

const articles = db.prepare("SELECT * FROM articles").all()
console.log(articles)















export default db;