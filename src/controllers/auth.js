const argon2 = require('argon2');
const pool = require('../sql/db');
const queries = require('../models/auth');
const JWT = require('jsonwebtoken');

const signup = async (req, res) => {
	const { username, email, password } = req.body;
	let hash;
	try {
		hash = await argon2.hash(password);
	} catch (err) {
		return res.status(500).json({ message: 'Error creating new user', err });
	}

	pool.query(queries.signup, [username, email, hash], (err, results) => {
		if (err) {
			return res.status(500).json({ message: 'Error creating new user', err });
		}
		console.log(results);
		let token = JWT.sign(
			{
				username: username,
				user_id: results.rows.id,
			},
			process.env.JWT_SECRET
		);
		console.log(token);

		return res
			.status(200)
			.json({ message: 'User successfully created', results, token });
	});
};

const login = async (req, res) => {
	const { email, password } = req.body;
	pool.query(queries.login, [email], async (err, results) => {
		if (err) {
			return res.status(500).json({ message: 'Error creating user', err });
		}
		if (results.length > 1) {
			return res
				.status(500)
				.json({ message: 'Returned too many results for requested email' });
		}
		if (results.length === 0) {
			return res.status(400).json({ message: 'Email address does not exist' });
		}
		console.log(results);

		const hashPassword = results.rows[0].pw_hash;
		let match;
		try {
			match = await argon2.verify(hashPassword, password);
			console.log(match);
		} catch (err) {
			console.log(err);
			return res
				.status(500)
				.json({ message: 'Something went wrong logging in', err });
		}
		if (!match) {
			return res.status(400).json({ message: 'Passwords do not match' });
		}

		let token = JWT.sign(
			{
				username: results.rows[0].username,
				email: results.rows[0].email,
				id: results.rows[0].id,
			},
			process.env.JWT_SECRET
		);
		return res.status(200).json({ token, message: 'Successfully logged in.' });
	});
};

module.exports = {
	signup,
	login,
};
