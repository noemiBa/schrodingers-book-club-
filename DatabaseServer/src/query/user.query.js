const QUERY = {
	SELECT_USERS: 'SELECT * FROM users',
	SELECT_USER_BY_ID: 'SELECT * FROM users WHERE id = ?',
	CREATE_USER: 'INSERT INTO users(username, password) VALUES(?, ?)',
	UPDATE_USER: 'UPDATE users SET username = ?, password = ? WHERE id = ?',
	DELETE_USER: 'DELETE FROM users WHERE id = ?',
}

export default QUERY;