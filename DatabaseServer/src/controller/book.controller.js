import database from '../config/mysql.config.js';
import createResponse from '../domain/response.js';
import log from '../util/logger.js';
import BOOK_QUERY from '../query/book.query.js';
import { httpStatus } from '../constants/httpStatus.js';

export const getBooks = (req, res) => {
	log.info(`${req.method} ${req.originalUrl}, fetching books...`);
	database.query(BOOK_QUERY.SELECT_BOOKS, (err, rows) => {

		if (!rows) {
			log.error(err.message);
			res.status(httpStatus.NO_CONTENT.statusCode)
				.send(createResponse(httpStatus.NO_CONTENT.statusCode, httpStatus.NO_CONTENT.httpStatus, 'No books found', null));
		} else {
			res.status(httpStatus.OK.statusCode)
				.send(createResponse(httpStatus.OK.statusCode, httpStatus.OK.httpStatus, 'Books fetched successfully', { books: rows }));
		}
	});
};

export const getBookByISBN = (req, res) => {
	log.info(`${req.method} ${req.originalUrl}, fetching book by ISBN...`);
	const { isbn } = req.params;
	database.query(BOOK_QUERY.SELECT_BOOK_BY_ISBN, [isbn], (err, rows) => {
		if (!rows || rows.length === 0) {
			res.status(httpStatus.NO_CONTENT.statusCode)
				.send(createResponse(httpStatus.NO_CONTENT.statusCode, httpStatus.NO_CONTENT.httpStatus, 'No book found', null));
		} else {
			res.status(httpStatus.OK.statusCode)
				.send(createResponse(httpStatus.OK.statusCode, httpStatus.OK.httpStatus, 'Book fetched successfully', { book: rows[0] }));
		}
	});
};

export default httpStatus;
