export const httpStatus = {
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