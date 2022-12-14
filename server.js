const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const methodOverride = require('method-override');
const flash = require('express-flash');
const logger = require('morgan');
const favicon = require('serve-favicon');
const path = require('path');

const connectDB = require('./config/database.js');

const mainRoutes = require('./routes/main');
const feedRoutes = require('./routes/feed');
const bookRoutes = require('./routes/books');
const errorRoutes = require('./routes/errors');

require('dotenv').config({ path: './config/.env' });
require('./config/passport')(passport);

//Connect To Database
connectDB();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));

app.use(logger('dev'));

//Use forms for put / delete in ejs files
app.use(methodOverride('_method'));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: process.env.PHRASE,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

app.use('/', mainRoutes);
app.use('/feed', feedRoutes);
app.use('/book', bookRoutes);
app.use('/:error', errorRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port:${process.env.PORT}, you better catch it!`
  );
});
