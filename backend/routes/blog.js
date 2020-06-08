const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.json({ time: Date().toString() });
});

module.exports = router;