const router = require('express').Router();
const questionsController = require('../controllers/questions');

router.get('/', questionsController.getQuestions);
router.get('/:id', questionsController.getQuestionByID);
router.post('/', questionsController.createQuestion);
// router.delete('/:id', studentController.deleteStudent);
// router.put('/:id', studentController.updateStudent);

module.exports = router;
