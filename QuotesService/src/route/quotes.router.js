const express = require('express');
const { getBooksWithQuotes } = require('../controller/quotes.controller');

const router = express.Router();

router.get('/bookswithquotes', getBooksWithQuotes);

module.exports = router;
