const Pool = require('pg').Pool;

const pool = new Pool({
	user: 'jp',
	host: 'localhost',
	database: 'quiz',
	password: '',
	port: 5432,
});

pool.query('select now()', (err, results) => {
	if (err) {
		console.log('Could not test the database connection', err);
	} else {
		console.log('Connected to database successfully', results.rows);
	}
});

module.exports = pool;
