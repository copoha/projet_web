const uri = require("./config/key").mongoURI;
const port = process.env.PORT || 80;
const path = require("path");
var dotenv = require("dotenv").config();
var createError = require('http-errors');
var mongoose = require('mongoose');
var express = require('express');
//var cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
var logger = require('morgan');
var cors = require("cors");
const passport = require("passport");
require('./models/User');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var theatreRouter = require('./routes/theatre');
var testAPIRouter = require('./routes/testAPI');
var townRouter = require('./routes/town');
var movieRouter = require('./routes/movie');
const axios = require("axios");
const getMovieByName = require("./routes/movie");



var app = express();
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
//app.use("/users", users);
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, "client", "build")))


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);
app.use('/theatres', theatreRouter);
app.use('/towns', townRouter);
app.use('/movies', movieRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


mongoose.connect(uri, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//app.listen(port);
//app.listen(port, () => console.log(`Server up and running on port ${port} !`));
module.exports = app;

