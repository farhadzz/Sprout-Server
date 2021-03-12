const router = require('express').Router()
const UserController = require('../controllers/userController')
const { authentication } = require('../middlewares/auth')

router.post('/register', UserController.registerHandler)
router.post('/login', UserController.loginHandler)
router.use(authentication)
router.get('/users', UserController.findUserHandler)
router.get('/users/:email', UserController.findOneUserHandler)
router.delete('/users/:id', UserController.deleteUserHandler)

module.exports = router