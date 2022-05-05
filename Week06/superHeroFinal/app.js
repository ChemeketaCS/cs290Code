var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

//I am not going to use those route files
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//--------------------------------------------------------
//My routes

app.get("/", async (req, res) => {
  //send a plain file
  res.send("index.html");
});

//All other routes in heroes.js file
let heroRouter = require("./routes/heroes.js");
app.use("/heroes", heroRouter);

// catch any other route and send 404
app.use(function (req, res, next) {
  //Could send a file here instead...
  res.status = 404;
  res.send("No such file");
});

//--------------------------------------------------------

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
