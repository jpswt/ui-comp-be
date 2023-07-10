const getQuestions = 'select * from questions';

const getQuestionByID = 'select * from questions where ID = $1';

const checkEmail = 'select s from students s where s.email = $1';

const createQuestion =
	'insert into questions (userID,category,qtype,question,author,createdon) values ($1,$2,$3,$4,$5,$6) ';

const deleteStudent = 'delete from students where id = $1';

const updateStudent = 'update students set name = $1 where id = $2';

module.exports = {
	getQuestions,
	getQuestionByID,
	createQuestion,
};
