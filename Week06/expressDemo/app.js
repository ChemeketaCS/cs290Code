var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//---------------------------------------------------
//New routes - Self contained here:
app.get("/test", (req, res) => {
  res.send("You accessed /test");
});

app.get("/test/file.html", (req, res) => {
  res.send("You accessed /test/file.html");
});

app.get("/secret.html", (req, res, next) => {
  console.log("We are here...");
  //Add something to response
  res.body = "Start of message...<br>";
  next(); //continue processing this
});

app.get("/secret.html", (req, res) => {
  console.log("...and here");
  res.body += "...end of message";
  res.send(res.body); //send the body we built
});
//---------------------------------------------------


//---------------------------------------------------
//New routes - direct all /dept requests to the
// rules in routes/department.js
var departmentRouter = require('./routes/department');
app.use('/dept', departmentRouter);
//---------------------------------------------------


//Sample routes created by express generator:
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //DEFAULT - just prints `error` to response
  //next(createError(404));

//---------------------------------------------------
  //send a custom 404 (file not found) page
  res.sendFile(__dirname + "/public/404.html");
//---------------------------------------------------
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

module.exports = app;
