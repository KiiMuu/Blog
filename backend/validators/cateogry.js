const { check } = require('express-validator');

exports.categoryValidator = [
    check('name')
    .not()
    .isEmpty()
    .withMessage('Name can\'t be blank')
];