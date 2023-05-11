const express = require('express');
const cors = require('cors');
const booksRouter = require('./route/quotes.router');

const app = express();
const port = 3001;

app.use(cors());
app.use(booksRouter);

app.listen(port, () => {
  console.log(`QuotesService listening at http://localhost:${port}`);
});
