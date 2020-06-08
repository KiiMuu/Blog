const { check } = require('express-validator');

exports.userSignUpValidator = [
    check('name').not().isEmpty().withMessage('Name can\'t be blank'),
    check('email').isEmail().withMessage('Please enter a valid Email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6')
];