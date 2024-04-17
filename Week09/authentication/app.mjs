import { default as createError } from 'http-errors';
import { default as express } from 'express';
import { default as path } from 'path';
import { default as cookieParser } from 'cookie-parser';
import { default as session } from 'express-session'
import { default as bcrypt } from 'bcrypt';

//mongoDB to store users and sessions
import { default as credentials } from './dbCredentials.mjs';
import { default as MongoDBStore } from 'connect-mongodb-session';
import { default as mongoose } from 'mongoose';
import { default as User } from './models/user.mjs';

//passport and passport-local for authentication
import { default as passport } from 'passport';
import { default as LocalStrategy } from 'passport-local';

// Create an express app
const app = express();

// Get the directory name of the current module
const __dirname = import.meta.dirname;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// urlencoded middlware for parsing bodies from requests
app.use(express.urlencoded({ extended: false }));

// Set up mongodb to store session information
const sessionStore = new MongoDBStore(session)({
  uri: credentials.connection_string,
  collection: "mySessions",
});

// Use default session engine
app.use(
  session({
    secret: "j243.4xchff982yf807NAYsDF97n6t935r3", //This should not be in code!
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));

//Connect to DB with Mongoose
mongoose.connect(credentials.connection_string);

//How to store user into the session when the log in
passport.serializeUser(function (user, callback) {
  process.nextTick(function () {
    console.log("Serializing user", user.name);
    callback(null, { name: user.name });
  });
});

//How to get user from session
passport.deserializeUser(function (user, callback) {
  process.nextTick(function () {
    return callback(null, user);
  });
});

//Set up local strategy for passport
passport.use(
  new LocalStrategy(
    //options for strategy
    {
      usernameField: 'username',
      passwordField: 'password',
    },
    //callback function to do actual authentication
    function (username, password, doneCallback) {
      console.log("Checking user", username, password);

      //Look for user in DB
      let userPromise = User.findOne({ name: username });
      userPromise.then((user) => {
        //If no user found, tell callback. false second parameter means no user found
        if (!user) {
          console.log("No such user");
          return doneCallback(null, false, { message: "Incorrect username." });
        }

        //Have a user, check password
        let passwordCorrect = bcrypt.compareSync(password, user.password);


        //If no user found, tell callback
        if (!passwordCorrect) {
          console.log("Bad password");
          return doneCallback(null, false, { message: "Incorrect password." });
        }

        //Success! Tell callback
        console.log("Authenticated");
        return doneCallback(null, user);
      }).catch((err) => {
        //Mystery error - let callback deal with it
        console.log("Error in authentication");
        return doneCallback(err);
      });
    }
  )
);

//Look for static files in public
app.use(express.static(path.join(__dirname, "public")));

//---------------------------------------------------
//Routes
app.get("/", function (req, res, next) {
  console.log("Current user", req.user);
  res.render("index", { title: "Express", user: req.user });
});

app.get("/login", function (req, res) {
  console.log("Login page requested");
  res.render("login", { message: req.session.messages });
});

app.post(
  "/login",
  function (req, res, next) {
    //clear any existing messages set by passport
    req.session.messages = [];
    //Let passport handle the login post request
    let authenticator = passport.authenticate('local', {
      successRedirect: '/',           //on success redirect to home
      failureRedirect: '/login',      //on failure redirect to login
      failureMessage: true,           //put feedback in req.session.messages
    })
    authenticator(req, res, next);
  }
);

app.get("/logout", function (req, res) {
  //Terminate login session
  req.logout((err) => {
    if (err) {
      console.log("Error in logout");
    }
    res.redirect("/");
  });
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

//---------------------------------------------------
// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port} in directory ${__dirname}`);
});
