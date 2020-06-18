const { check } = require('express-validator');

exports.tagValidator = [
    check('name')
    .not()
    .isEmpty()
    .withMessage('Name can\'t be blank')
];