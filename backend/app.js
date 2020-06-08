const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const connectMongo = require('./config/db');

// get routes
const blogRoutes = require('./routes/blog');

// app
const app = express();

// connect to mongoDB
connectMongo();

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// cors
if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}

// use routes
app.use('/api', blogRoutes);

// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`App is up on port ${port}`);
});