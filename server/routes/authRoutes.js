const express = require('express'); 
const router = express.Router(); 
const { loginValidation } = require('../validators/login-validator');
const authController = require('../controllers/authController')

router.post('/signup', authController.signup)
router.post('/login', loginValidation, authController.login)

module.exports = router; 
