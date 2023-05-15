const NodeCache = require('node-cache');
const request = require('request-promise');
const isbnList = require('./data/books');
const cache = new NodeCache();

async function getBooksWithExcerpts() {
    const isbnList = await getIsbnList();
    const bookList = [];
  
    for (const isbn of isbnList) {
      const bookData = await getBookData(isbn);
      if (bookData.excerpts && bookData.cover) {
        const excerpts = bookData.excerpts.map(excerpt => excerpt.text);
        bookList.push({
          isbn: isbn,
          title: bookData.title,
          author: bookData.authors[0].name,
          excerpts: excerpts,
          cover: bookData.cover.large
        });
      }
    }
    return bookList;
}
  
async function getBookData(isbn) {
    const cacheKey = `bookData:${isbn}`;
    const bookApiUrl = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`;
  
    return getCachedData(cacheKey, async () => {
      const bookResponse = await request({ uri: bookApiUrl, json: true });
      return bookResponse[`ISBN:${isbn}`];
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
