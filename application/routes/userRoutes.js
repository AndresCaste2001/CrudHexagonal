// Definimos las rutas de la aplicación y mapea las URLs a los controladores.
const express = require('express');
const UserController = require('../controllers/userController');
const UserValidator = require('../validator/userValidator');
const {auth} = require("../middlewares/authenticateToken")
const {sessionAuth} = require("../middlewares/sessionLogin")

const router = express.Router();
const userController = new UserController();
const userValidator = new UserValidator();

router.post('/', userValidator.validateUserData(), (req, res) => userController.createUser(req, res));
router.post('/login', sessionAuth, userValidator.validateUserLogin(), (req, res) => userController.verifyUser(req, res));
router.get('/:id', auth, userValidator.validateUserId(), (req, res) => userController.getUser(req, res));
router.put('/:id', auth, userValidator.validateUserUpdateDataById(), (req, res) => userController.updateUser(req, res));
router.delete('/:id', auth, userValidator.validateUserId(), (req, res) => userController.deleteUser(req, res));
router.get('/search', auth, (req, res) => userController.searchUsers(req, res));

module.exports = router;