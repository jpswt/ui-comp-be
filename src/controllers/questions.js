const pool = require('../sql/db');
const queries = require('../models/questions');

const getQuestions = (req, res) => {
	console.log('/GET all questions');
	pool.query(queries.getQuestions, (err, results) => {
		if (err) throw err;
		res.status(200).json(results.rows);
	});
};

const getQuestionByID = (req, res) => {
	console.log('/GET question by id');
	const id = parseInt(req.params.id);
	pool.query(queries.getQuestionByID, [id], (err, results) => {
		if (err) throw err;
		res.status(200).json(results.rows);
	});
};

const createQuestion = (req, res) => {
	console.log('/POST new question');
	const { userID, category, qtype, question, author } = req.body;
	const date = new Date();

	pool.query(
		queries.createQuestion,
		[userID, category, qtype, question, author, date],
		(err, results) => {
			if (err) throw err;
			res.status(201).send('Student created successfully');
		}
	);

	// if

	// const id = parseInt(req.params.id);
	// pool.query(queries.getStudentByID, [id], (err, results) => {
	// 	if (err) throw err;
	// 	res.status(200).json(results.rows);
	// });
};

const deleteStudent = (req, res) => {
	console.log('/DELETE students by id');
	const id = parseInt(req.params.id);
	pool.query(queries.getStudentByID, [id], (err, results) => {
		const noStudentFound = !results.rows.length;
		if (noStudentFound) {
			res.send('Student does not exist in the database.');
		}
		pool.query(queries.deleteStudent, [id], (err, results) => {
			if (err) throw err;
			res.status(200).send('The student has been deleted');
		});
	});
};

const updateStudent = (req, res) => {
	console.log('update student data by id');
	const id = parseInt(req.params.id);
	const { name } = req.body;
	pool.query(queries.getStudentByID, [id], (err, results) => {
		const noStudentFound = !results.rows.length;
		if (noStudentFound) {
			res.send('Student does not exist in the database.');
		}
		pool.query(queries.updateStudent, [name, id], (err, results) => {
			if (err) throw err;
			res.status(200).send('The student has been updated');
		});
	});
};

module.exports = {
	getQuestions,
	getQuestionByID,
	createQuestion,
	// deleteStudent,
	// updateStudent,
};
