var express = require("express");
var path = require("path");
var logger = require("morgan");

var app = express();

//Automatically convert cookie strings to js objects available in request
var cookieParser = require("cookie-parser");
app.use(cookieParser());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
