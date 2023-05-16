const NodeCache = require('node-cache');
const request = require('request-promise');
const isbnList = require('./data/books');
const cache = new NodeCache();

async function getBooksWithExcerpts() {
    const isbnList = await getIsbnList();
    const bookList = [];
  
    for (const isbn of isbnList) {
      const bookData = await getBookData(isbn);
      if (bookData.statusCode === 200) {
        const excerpts = [bookData.data.book.excerpt];
        bookList.push({
          isbn: isbn,
          title: bookData.data.book.title,
          author: bookData.data.book.author,
          excerpts: excerpts,
          cover: bookData.data.book.cover
        });
      }
    }
    return bookList;
}
  
async function getBookData(isbn) {
    const cacheKey = `bookData:${isbn}`;
    const bookApiUrl = `http://backend-service:3000/books/${isbn}`;
  
    return getCachedData(cacheKey, async () => {
      const bookResponse = await request({ uri: bookApiUrl, json: true });
      return bookResponse;
    });
}
  
  
async function getIsbnList() {
    const cacheKey = 'isbnList';
    return getCachedData(cacheKey, async () => isbnList);
}

async function getCachedData(cacheKey, requestFn) {
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }
  
    const data = await requestFn();
    cache.set(cacheKey, data);
  
    return data;
  }

module.exports = { getBooksWithExcerpts };
