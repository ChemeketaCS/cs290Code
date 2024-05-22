
import { default as path } from 'path'
import { default as express } from 'express'

// Create an express app
const app = express();

// Get the directory name of the current module
const __dirname = import.meta.dirname;

//use middleware to parse the body of the request
app.use(express.urlencoded({ extended: false }));

// Have middleware parse cookies for us
import { default as cookieParser } from 'cookie-parser';
app.use(cookieParser());

// Library for sessions
import { default as session } from 'express-session';

//-----------------------------------------------------------
// Set up mongodb to store session information
// This block not needed for memory storage.

// // Make a mongodb connection for use by the session
// import { default as credentials } from './dbCredentials.mjs';
// import { default as MongoDBStore } from 'connect-mongodb-session';
// const sessionStore = new MongoDBStore(session)({
//   uri: credentials.connection_string,
//   collection: "mySessions",
// });
// // If there is an error with working with the session storage, just log it
// sessionStore.on('error', function (error) {
//   console.log(error);
// });
//------------------------------------------------------------

// Now tell express to use the express-session middleware to store session info
app.use(
  session({
    secret: "j243.4xchff982yf807NAYsDF97n6t935r3", //This should not be in code!
    cookie: {
      httpOnly: true, //Don't want JS to see session cookie
      maxAge: 1000 * 60 * 60 * 24 * 7, //expire after 7 days
    },
    resave: false, //Don't constantly update session if no changes
    saveUninitialized: false, //Don't start session until we write to it

    // //Next line uncommented says to use the sessionStore created above
    // // to store the session info in MongoDB. If using memory, comment it out
    // store: sessionStore,
  })
);

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(express.static(path.join(__dirname, "public")));

// My routers
import { default as indexRouter } from './routes/index.mjs'
import { default as usersRouter } from './routes/users.mjs'
app.use("/", indexRouter);
app.use("/users", usersRouter);

// 404 handler
app.use(function (req, res) {
  res.status = 404;
  res.send("File not found");
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
