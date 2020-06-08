const express = require('express');

// controllers
const blogController = require('../controllers/blog');

const router = express.Router();

router.get('/', blogController.time);

module.exports = router;