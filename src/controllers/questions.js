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
};

const deleteQuestion = (req, res) => {
	console.log('/DELETE question by id');
	const id = parseInt(req.params.id);
	pool.query(queries.getQuestionByID, [id], (err, results) => {
		const noQuestionFound = !results.rows.length;
		if (noQuestionFound) {
			res.send('Question does not exist in the database.');
		}
		pool.query(queries.deleteQuestion, [id], (err, results) => {
			if (err) throw err;
			res.status(200).send('The question has been deleted');
		});
	});
};

const updateQuestion = (req, res) => {
	console.log('/PUT question data updated by id');
	const id = parseInt(req.params.id);
	const { userID, category, qtype, question, author, createdon } = req.body;
	const date = new Date();
	pool.query(queries.getQuestionByID, [id], (err, results) => {
		const noQuestionFound = !results.rows.length;
		if (noQuestionFound) {
			res.send('Question does not exist in the database.');
		}
		pool.query(
			queries.updateQuestion,
			[userID, category, qtype, question, author, date, id],
			(err, results) => {
				if (err) throw err;
				res.status(200).send('The question has been updated');
			}
		);
	});
};

module.exports = {
	getQuestions,
	getQuestionByID,
	createQuestion,
	deleteQuestion,
	updateQuestion,
};
