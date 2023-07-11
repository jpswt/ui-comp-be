const router = require('express').Router();
const questionsController = require('../controllers/questions');
const verifyJWT = require('../middleware/auth');

router.get('/', verifyJWT, questionsController.getQuestions);
router.get('/:id', questionsController.getQuestionByID);
router.get('/users/:id', questionsController.getQuestionByUserID);
router.post('/', verifyJWT, questionsController.createQuestion);
router.put('/:id', questionsController.updateQuestion);
router.delete('/:id', questionsController.deleteQuestion);

module.exports = router;
