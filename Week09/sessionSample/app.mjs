import { default as createError } from 'http-errors'
import { default as express } from 'express'
import { default as session } from 'express-session'
import { default as path } from 'path'

import { default as cookieParser } from 'cookie-parser'

import { default as indexRouter } from './routes/index.mjs'
import { default as usersRouter } from './routes/users.mjs'

// Create an express app
const app = express();

// Get the directory name of the current module
const __dirname = import.meta.dirname;

// //Set up mongodb to store session information
import { default as credentials } from './dbCredentials.mjs';
import { default as MongoDBStore } from 'connect-mongodb-session';
const sessionStore = new MongoDBStore(session)({
  uri: credentials.connection_string,
  collection: "mySessions",
});

sessionStore.on('error', function (error) {
  console.log(error);
});

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
    store: sessionStore,
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


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
////---------------------------------------------------
// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port} in directory ${__dirname}`);
});
