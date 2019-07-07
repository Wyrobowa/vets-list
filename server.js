const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

// models
require('./models/Vet');
require('./models/Tag');

const helpers = require('./helpers');
const routes = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configs
dotenv.config();

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.log(`DB Error! -  ${err}`);
});

app.use(morgan('dev'));

app.use((req, res, next) => {
  res.locals.h = helpers;
  next();
});

// routes
app.use('/', routes);

// setting port
app.set('port', process.env.PORT || 9000);

// server start
const server = app.listen(app.get('port'), () => {
  console.log(`Express running on port ${server.address().port}`);
});
