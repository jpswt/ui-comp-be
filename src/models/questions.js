const getQuestions = 'select * from questions';

const getQuestionByID = 'select * from questions where id = $1';

const createQuestion =
	'insert into questions (userID,category,qtype,question,author,createdon) values ($1,$2,$3,$4,$5,$6) ';

const deleteQuestion = 'delete from questions where id = $1';

const updateQuestion =
	'update questions set userID = $1, category = $2, qType=$3, question=$4, author=$5, createdon=$6 where id = $7';

module.exports = {
	getQuestions,
	getQuestionByID,
	createQuestion,
	deleteQuestion,
	updateQuestion,
};
