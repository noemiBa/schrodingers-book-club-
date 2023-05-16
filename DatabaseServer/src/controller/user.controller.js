import database from '../config/mysql.config.js';
import createResponse from '../domain/response.js';
import log from '../util/logger.js';
import QUERY from '../query/user.query.js';
import { httpStatus } from '../constants/httpStatus.js';

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

export const loginUser = (req, res) => {
	log.info(`${req.method} ${req.originalUrl}, logging in user`);
	const { name, password } = req.body;
	log.info(`name passed in = ${name}`)
	database.query(QUERY.SELECT_USER_BY_NAME, [name], (err, rows) => {
		if (!rows || rows.length === 0) {
			log.warn("no user found");
			res.status(httpStatus.NO_CONTENT.statusCode)
				.send(createResponse(httpStatus.NO_CONTENT.statusCode, httpStatus.NO_CONTENT.httpStatus, 'No user found', false));
		} else {
			console.dir(rows[0]);
			if (password === rows[0].password) {
				res.status(httpStatus.OK.statusCode)
				.send(createResponse(httpStatus.OK.statusCode, httpStatus.OK.httpStatus, 'User logged in successfully', { user: rows[0] }));
			} else {
				res.status(httpStatus.NO_CONTENT.statusCode)
				.send(createResponse(httpStatus.NO_CONTENT.statusCode, httpStatus.NO_CONTENT.httpStatus, 'Incorrect Password', false));
			}
		}
	})
}


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