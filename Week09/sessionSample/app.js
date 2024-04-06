import {default as createError} from 'http-errors'
import {default as express} from 'express'
import {default as session} from 'express-session'
import {default as path} from 'path'

import {default as cookieParser} from 'cookie-parser'
import {default as logger} from 'morgan'

import {default as indexRouter} from './routes/index.js'
import {default as usersRouter} from './routes/users.js'

const __dirname = import.meta.dirname;

var app = express();

// //Set up mongodb to store session information
import {default as credentials} from './dbCredentials.js';
import {default as MongoDBStore} from 'connect-mongodb-session'(session);
// const sessionStore = new MongoDBStore({
//   uri: credentials.connection_string,
//   collection: "mySessions",
// });

app.use(
  session({
    secret: "j243.4xchff982yf807NAYsDF97n6t935r3", //This should not be in code!
    cookie: {
      httpOnly: true, //Don't want JS to see session cookie
      maxAge: 1000 * 60 * 60 * 24 * 7, //expire after 7 days
    },
    resave: false, //Don't constantly update session if no changes
    saveUninitialized: false, //Don't start session until we write to it
    ////Uncomment to save in DB
    //store: sessionStore,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

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

export default app;
//module.exports = app;
