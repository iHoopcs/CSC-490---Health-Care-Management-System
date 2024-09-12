const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/userData', userController.fetchUserData)

module.exports = router; 
