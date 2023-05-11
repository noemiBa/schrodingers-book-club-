const express = require('express');
const { getBooks } = require('../controller/quotes.controller');

const router = express.Router();

router.get('/books', getBooks);

module.exports = router;
