const BOOK_QUERY = {
	//SELECT_BOOKS: 'SELECT * FROM books',
	SELECT_BOOKS: 'SELECT b.*, GROUP_CONCAT(t.name) AS tags FROM books AS b LEFT JOIN book_tags AS bt ON bt.book_id = b.id LEFT JOIN tags AS t ON t.id = bt.tag_id GROUP BY b.id',
	SELECT_BOOK_BY_ISBN: 'SELECT b.*, GROUP_CONCAT(t.name) AS tags FROM books AS b LEFT JOIN book_tags AS bt ON bt.book_id = b.id LEFT JOIN tags AS t ON t.id = bt.tag_id WHERE b.ISBN = ? GROUP BY b.id',
}

export default BOOK_QUERY;