var express = require('express');
var path = require('path');
var createError = require('http-errors')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//---------------------------------------------------
// //New routes - Self contained in this file:
app.get("/test", (req, res) => {
  res.send("You accessed /test");
});


app.get("/secret.html", (req, res, next) => {
  console.log("We are here...");
  //Add something to response
  res.body = "Start of message...<br>";
  next(); //continue processing this...
});

app.get("/secret.html", (req, res) => {
  console.log("...and here");
  res.body += "...end of message";
  res.send(res.body); //send the body we built
  //ends the chain of handlers
});

// Send a file
app.get("/foo/", (req, res) => {
  res.sendFile(__dirname + "/public/foo/index.html");
});


//Intentionally causes an error
app.get("/error", (req, res, next) => {
  let error = createError(401, 'Please login to view this page.');
  next(error);
});


//---------------------------------------------------


//---------------------------------------------------
// Direct all /dept requests to the rules in routes/department.js
var departmentRouter = require('./routes/department');
app.use('/department', departmentRouter);

//Direct /users requests to the routes in routes/users.js
var usersRouter = require('./routes/users');
app.use('/user', usersRouter);
//---------------------------------------------------

//If no other route works, try looking for the file in the
// public folder
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //DEFAULT - just prints `error` to response
  //next(createError(404));

//---------------------------------------------------
  //send a custom 404 (file not found) page
  res.status(404);
  res.sendFile(__dirname + "/public/404.html");
//---------------------------------------------------
});

// error handler
app.use(function(err, req, res, next) {
  let message = err.message;
  console.log(req.app);

  // Set the status code of response, default to 500
  res.status(err.status || 500);
  
  let body = `<h1>${message}</h1>`;
  body += `<h2>${err.status}</h2>`;
  body += `<pre>${err.stack}</pre>`;
  res.send(body);
});

module.exports = app;
