const { check } = require('express-validator');

const loginValidation = [
    check('email').isEmail().notEmpty().withMessage('Error: Check inputted email'),
    check('password').isLength({ min: 5, max: 20 }).withMessage('Password length: min: 5 characters & max: 20 characters')
];

module.exports = { loginValidation };
