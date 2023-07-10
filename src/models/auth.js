const signup =
	'insert into users (username,email,pw_hash) values($1,$2,$3) returning id';

const login = 'SELECT * FROM users WHERE email = $1';

module.exports = {
	signup,
	login,
};
