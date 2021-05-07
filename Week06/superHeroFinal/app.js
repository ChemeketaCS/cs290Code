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

//We could put routes into those... keeping it simple
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

//--------------------------------------------------------
//My routes

app.get("/", async (req, res) => {
  //send a plain file
  res.send("index.html");
});

app.get("/heroes/", async (req, res) => {
  const superSquad = await getSquad();
  console.log(superSquad);
  //Sort the members of superQuad
  superSquad.members.sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  //Manually render the view and send it
  //let page = await ejs.render("views/superheros.ejs", superSquad);
  //res.send(page);

  //Automatically render and send the view
  //Assumed view is in views/ folder

  res.render("superheroes.ejs", superSquad);
});

app.get("/hero/:name", async (req, res, next) => {
  const superSquad = await getSquad();
  console.log(superSquad);

  const heroName = req.params.name;

  console.log("--------------------");
  console.log(heroName);
  console.log("--------------------");
  let index = -1;

  superSquad.members.forEach((value, i) => {
    if (value.name === heroName) {
      index = i;
    }
  });

  let hero = superSquad.members[index];
  console.log(hero);

  if (index != -1) res.render("superheroSingle.ejs", hero);
  else next();
});

app.get("*", async (req, res) => {
  res.status = 404;
  res.send("No such file");
  //Could send a file here instead...
});

//--------------------------------------------------------

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

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

//--------------------------------------------------------
//My data source - gets the super hero data

//Need to have node-fetch installed!
let fetch = require("node-fetch");

async function getSquad() {
  let responsePromise = await fetch(
    "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json"
  );
  let json = await responsePromise.json();
  return json;
}
