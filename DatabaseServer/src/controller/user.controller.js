import database from '../config/mysql.config.js';
import createResponse from '../domain/response.js';
import log from '../util/logger.js';
import QUERY from '../query/user.query.js';

const httpStatus = {
	OK: { statusCode: 200, httpStatus: 'OK' },
	CREATED: { statusCode: 201, httpStatus: 'CREATED' },
	NO_CONTENT: { statusCode: 204, httpStatus: 'NO_CONTENT' },
	BAD_REQUEST: { statusCode: 400, httpStatus: 'BAD_REQUEST' },
	UNAUTHORIZED: { statusCode: 401, httpStatus: 'UNAUTHORIZED' },
	FORBIDDEN: { statusCode: 403, httpStatus: 'FORBIDDEN' },
	NOT_FOUND: { statusCode: 404, httpStatus: 'NOT_FOUND' },
	CONFLICT: { statusCode: 409, httpStatus: 'CONFLICT' },
	I_AM_A_TEAPOT: { statusCode: 418, httpStatus: 'I_AM_A_TEAPOT' },
	INTERNAL_SERVER_ERROR: { statusCode: 500, httpStatus: 'INTERNAL_SERVER_ERROR' },
};

export const getUsers = (req, res) => {
	log.info(`${req.method} ${req.originalUrl}, fetching users...`);
	database.query(QUERY.SELECT_USERS, (err, rows) => {

		if (!rows) {
			log.error(err.message);
			res.status(httpStatus.NO_CONTENT.statusCode)
				.send(createResponse(httpStatus.NO_CONTENT.statusCode, httpStatus.NO_CONTENT.httpStatus, 'No users found', null));
		} else {
			res.status(httpStatus.OK.statusCode)
				.send(createResponse(httpStatus.OK.statusCode, httpStatus.OK.httpStatus, 'Users fetched successfully', {users: rows }));
		}
	});
};

export const createUser = (req, res) => {
	log.info(`${req.method} ${req.originalUrl}, creating user...`);
	const { name, password } = req.body;
	database.query(QUERY.CREATE_USER, [name, password], (err, rows) => {
		if (!rows) {
			log.error(err.message);
			res.status(httpStatus.INTERNAL_SERVER_ERROR.statusCode)
				.send(createResponse(httpStatus.INTERNAL_SERVER_ERROR.statusCode, httpStatus.INTERNAL_SERVER_ERROR.httpStatus, 'Failed to create user', null));
		} else {
			const user = { id: rows.insertId, name, password };
			res.status(httpStatus.CREATED.statusCode)
				.send(createResponse(httpStatus.CREATED.statusCode, httpStatus.CREATED.httpStatus, 'User created successfully', { user }));
		}
	});
};

export const getUserById = (req, res) => {
	log.info(`${req.method} ${req.originalUrl}, fetching user by id...`);
	const { id } = req.params;
	database.query(QUERY.SELECT_USER_BY_ID, [id], (err, rows) => {
		if (!rows || rows.length === 0) {
			res.status(httpStatus.NO_CONTENT.statusCode)
				.send(createResponse(httpStatus.NO_CONTENT.statusCode, httpStatus.NO_CONTENT.httpStatus, 'No user found', null));
		} else {
			res.status(httpStatus.OK.statusCode)
				.send(createResponse(httpStatus.OK.statusCode, httpStatus.OK.httpStatus, 'User fetched successfully', { user: rows[0] }));
		}
	});
};


export const updateUser = (req, res) => {
	log.info(`${req.method} ${req.originalUrl}, updating user...`);
	const { id } = req.params;
	const { name, password } = req.body;
	database.query(QUERY.UPDATE_USER, [name, password, id], (err, rows) => {
		if (!rows) {
			log.error(err.message);
			res.status(httpStatus.INTERNAL_SERVER_ERROR.statusCode)
				.send(createResponse(httpStatus.INTERNAL_SERVER_ERROR.statusCode, httpStatus.INTERNAL_SERVER_ERROR.httpStatus, 'Failed to update user', null));
		} else {
			const user = { id, name, password };
			res.status(httpStatus.OK.statusCode)
				.send(createResponse(httpStatus.OK.statusCode, httpStatus.OK.httpStatus, 'User updated successfully', { user }));
		}
	});
};

export const deleteUser = (req, res) => {
	log.info(`${req.method} ${req.originalUrl}, deleting user...`);
	const { id } = req.params;
	database.query(QUERY.DELETE_USER, [id], (err, rows) => {
		if (!rows.affectedRows > 0) {
			log.error(err.message);
			res.status(httpStatus.INTERNAL_SERVER_ERROR.statusCode)
				.send(createResponse(httpStatus.INTERNAL_SERVER_ERROR.statusCode, httpStatus.INTERNAL_SERVER_ERROR.httpStatus, 'Failed to delete user', null));
		} else {
			res.status(httpStatus.OK.statusCode)
				.send(createResponse(httpStatus.OK.statusCode, httpStatus.OK.httpStatus, 'User deleted successfully', null));
		}
	});
};


export default httpStatus;