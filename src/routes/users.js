const router = require('express').Router();
const usersController = require('../controllers/users');
const verifyJWT = require('../middleware/auth');

router.get('/', verifyJWT, usersController.getUsers);
router.get('/:id', usersController.getUserById);

module.exports = router;
