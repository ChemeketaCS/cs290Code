import {default as express} from 'express';
import {default as path} from 'path';
import {default as cookieParser} from 'cookie-parser';
import {default as logger} from 'morgan';

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Use database with mongoose
import {default as credentials} from './dbCredentials.js';
import {default as mongoose} from 'mongoose';
mongoose.connect(credentials.connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Try to serve request as a static file from public dir
app.use(express.static(path.join(__dirname, "public")));

//Add in custom routes
import {default as teamsRouter} from './routes/teams';
app.use("/teams", teamsRouter);
import {default as heroesRouter} from './routes/heroes';
app.use("/heroes", heroesRouter);

// Catch any other route and send 404
app.use(function (req, res, next) {
  //Could send a file here instead...
  res.status = 404;
  res.send("No such file");
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
