import express from 'express';
import db from './bd.js';
import { logger } from './middlewares/logs.js';
import authorsRouter from './routes/authors.route.js';
import articlesRouter from './routes/articles.route.js';



const app = express();
app.use(express.json());
app.use(logger);
app.use('/authors', authorsRouter);
app.use('/articles', articlesRouter);



app.listen(3000, () => {
  console.log(`Server is running`);
});