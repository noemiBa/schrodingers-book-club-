function createResponse(statusCode, httpStatus, message, data) {
	const timestamp = new Date().toLocaleString();
	return { statusCode, httpStatus, message, data, timestamp };
}

export default createResponse;