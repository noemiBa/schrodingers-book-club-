const request = require('request-promise');
const openLibraryURL = 'https://openlibrary.org/'

async function getBooksWithExcerpts() {
    const isbnList = await getIsbnList();
    const bookList = [];
  
    for (const isbn of isbnList) {
      const bookData = await getBookData(isbn);
      if (bookData.excerpts !== undefined) {
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
    const bookApiUrl = `${openLibraryURL}api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`;
    const bookResponse = await request({ uri: bookApiUrl, json: true });
    return bookResponse[`ISBN:${isbn}`];
}

async function getIsbnList() {
    const apiUrl = `${openLibraryURL}/search.json?q=harry+potter&fields=isbn`;
    const response = await request({ uri: apiUrl, json: true });
    const isbnList = response.docs.flatMap(book => book.isbn).slice(0,50);
    return isbnList;
}

module.exports = { getBooksWithExcerpts };
