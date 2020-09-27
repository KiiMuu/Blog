const { check } = require('express-validator');

exports.contactFormValidator = [
    check('name')
    .not()
    .isEmpty()
    .withMessage('Name can\'t be blank'),
    check('email')
    .isEmail()
    .withMessage('Invalid Email'),
    check('message')
    .not()
    .isEmpty()
    .isLength({ min: 20 })
    .withMessage('Message must be at least 20 characters long')
];