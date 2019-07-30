/* eslint-disable no-console */
const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const passport = require('passport');
const promisify = require('es6-promisify');
const flash = require('connect-flash');
const MongoVet = require('connect-mongo')(session);

// configs
dotenv.config();

// models
require('./models/Vet');
require('./models/Tag');
require('./models/Contact');
require('./models/User');

const helpers = require('./helpers');
const routes = require('./routes/index');

// handlers
require('./handlers/passport');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressValidator());

app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoVet({ mongooseConnection: mongoose.connection }),
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (err) => {
  console.log(`DB Error! -  ${err}`);
});

app.use(morgan('dev'));

// routes
app.use('/', routes);

// setting port
app.set('port', process.env.PORT || 9000);

// server start
const server = app.listen(app.get('port'), () => {
  console.log(`Express running on port ${server.address().port}`);
});
