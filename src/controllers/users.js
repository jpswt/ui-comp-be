const pool = require('../sql/db');
const queries = require('../models/users');

const getUsers = (req, res) => {
	console.log('/GET all users');
	pool.query(queries.getUsers, (err, results) => {
		if (err) throw err;
		res.status(200).json(results.rows);
	});
};

const getUserById = (req, res) => {
	console.log('/GET user by id');
	const { id } = req.params;
	pool.query(queries.getUserById, [id], (err, results) => {
		if (err) throw err;
		res.status(200).json(results.rows);
	});
};

module.exports = {
	getUsers,
	getUserById,
};
