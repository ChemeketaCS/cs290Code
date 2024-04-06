import {default as express} from 'express';
import {default as path} from 'path';
import {default as cookieParser} from 'cookie-parser';
import {default as logger} from 'morgan';

var app = express();

// view engine setup
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

//Add in custom routes
import {default as teamsRouter} from './routes/teams';
app.use("/teams", teamsRouter);
import {default as heroesRouter} from './routes/heroes';
app.use("/heroes", heroesRouter);

app.use(express.static(path.join(__dirname, "public")));

app.use(function (req, res, next) {
  next({ status: 404, message: "File not found" });
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
