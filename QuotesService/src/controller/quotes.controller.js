const { getBooksWithExcerpts } = require('../service/quotes.service');

async function getBooks(req, res) {
    try {
      const books = await getBooksWithExcerpts();
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}
  

module.exports = { getBooks };
