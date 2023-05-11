const express = require('express');
const booksRouter = require('./route/quotes.router');

const app = express();
const port = 3000;

app.use(booksRouter);

app.listen(port, () => {
  console.log(`QuotesService listening at http://localhost:${port}`);
});
