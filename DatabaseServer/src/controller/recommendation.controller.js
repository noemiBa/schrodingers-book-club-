import database from '../config/mysql.config.js';
import createResponse from '../domain/response.js';
import log from '../util/logger.js';
import RECOMMENDATION_QUERY from '../query/recommendation.query.js';
import BOOK_QUERY from '../query/book.query.js';
import { httpStatus } from '../constants/httpStatus.js';

export const getUserRecommendations = (req, res) => {
	log.info(`${req.method} ${req.originalUrl}, fetching user recommendations...`);
    const userID = req.params.id;
	database.query(RECOMMENDATION_QUERY.SELECT_RECOMMENDATIONS_BY_USER, [userID], (err, rows) => {

		if (!rows) {
			log.error(err.message);
			res.status(httpStatus.NO_CONTENT.statusCode)
				.send(createResponse(httpStatus.NO_CONTENT.statusCode, httpStatus.NO_CONTENT.httpStatus, 'No recommendations found', null));
		} else {
            
			res.status(httpStatus.OK.statusCode)
				.send(createResponse(httpStatus.OK.statusCode, httpStatus.OK.httpStatus, 'Recommendations fetched successfully', {userRecommendations: rows }));
		}
	});
};

export const createRecommendation = (req, res) => {
	log.info(`${req.method} ${req.originalUrl}, creating user recommendation...`);
	const { userID, ISBN } = req.body;
	database.query(RECOMMENDATION_QUERY.CREATE_RECOMMENDATION, [userID, ISBN], (err, rows) => {
		if (!rows) {
			log.error(err.message);
			res.status(httpStatus.INTERNAL_SERVER_ERROR.statusCode)
				.send(createResponse(httpStatus.INTERNAL_SERVER_ERROR.statusCode, httpStatus.INTERNAL_SERVER_ERROR.httpStatus, 'Failed to create recommendation', null));
		} else {
			const recommendation = { userID, ISBN };
			res.status(httpStatus.CREATED.statusCode)
				.send(createResponse(httpStatus.CREATED.statusCode, httpStatus.CREATED.httpStatus, 'User recommendation created successfully', { recommendation }));
		}
	});
};

