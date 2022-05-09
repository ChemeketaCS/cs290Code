var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Use database with mongoose
const credentials = require("./dbCredentials.js");
const mongoose = require("mongoose");
mongoose.connect(credentials.connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Add in custom routes
var teamsRouter = require("./routes/teams");
app.use("/teams", teamsRouter);
var heroesRouter = require("./routes/heroes");
app.use("/heroes", heroesRouter);

app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
