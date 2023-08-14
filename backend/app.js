const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

//middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());

// for testing purpose
app.use('/test', (req, res) => {
  res.send('Hello world!');
});

const user = require('./controller/user');
const recipe = require('./controller/recipe');

app.use('/api/v2/user', user);
app.use('/api/v2/recipe', recipe);

module.exports = app;
