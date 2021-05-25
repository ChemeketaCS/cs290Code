var createError = require("http-errors");
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
app.use(express.static(path.join(__dirname, "public")));

//Use default session engine
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

let passport = require("passport");
let LocalStrategy = require("passport-local").Strategy;
app.use(passport.initialize());
app.use(passport.session());

const credentials = require("./dbCredentials.js");
const mongoose = require("mongoose");
mongoose.connect(credentials.connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var User = require("./models/user.js");

passport.use(
  new LocalStrategy(function (username, password, done) {
    console.log("Checking user");
    User.findOne({ name: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        console.log("No such user");
        return done(null, false, { message: "Incorrect username." });
      }

      //Make use of bcrypt for encrypting user passwords
      const bcrypt = require("bcrypt");
      let passwordCorrect = bcrypt.compareSync(password, user.password);

      if (!passwordCorrect) {
        console.log("Bad password");
        return done(null, false, { message: "Incorrect password." });
      }

      console.log("Authenticated");
      return done(null, user);
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.get("/", function (req, res, next) {
  console.log(req.user);
  res.render("index", { title: "Express", user: req.user });
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/");
  }
);

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

app.get("/profile", function (req, res) {
  if (!req.user) {
    res.redirect("/login");
  } else res.send("I see you are logged in!");
});

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
