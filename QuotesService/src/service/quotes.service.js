const NodeCache = require('node-cache');
const request = require('request-promise');
const openLibraryURL = 'https://openlibrary.org/'
const cache = new NodeCache();

async function getBooksWithExcerpts() {
    const isbnList = await getIsbnList();
    const bookList = [];
  
    for (const isbn of isbnList) {
      const bookData = await getBookData(isbn);
      if (bookData.excerpts) {
        const excerpts = bookData.excerpts.map(excerpt => excerpt.text);
        bookList.push({
          isbn: isbn,
          title: bookData.title,
          author: bookData.authors[0].name,
          excerpts: excerpts
        });
      }
    }
    return bookList;
}
  
async function getBookData(isbn) {
    const cacheKey = `bookData:${isbn}`;
    const bookApiUrl = `${openLibraryURL}api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`;
  
    return getCachedData(cacheKey, async () => {
      const bookResponse = await request({ uri: bookApiUrl, json: true });
      return bookResponse[`ISBN:${isbn}`];
    });
}
  
async function getIsbnList() {
    const cacheKey = 'isbnList';
    const apiUrl = `${openLibraryURL}/search.json?q=harry+potter&fields=isbn`;
  
    return getCachedData(cacheKey, async () => {
      const response = await request({ uri: apiUrl, json: true });
      return response.docs.flatMap(book => book.isbn).slice(0,50);
    });
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
