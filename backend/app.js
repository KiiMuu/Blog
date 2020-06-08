const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// app
const app = express();

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// cors
app.use(cors());

// routes
app.get('/api', (req, res) => {
    res.json({ time: Date().toString() })
});

// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`App is up on port ${port}`);
});