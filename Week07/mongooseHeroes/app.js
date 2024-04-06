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

//Add in custom routes
import {default as teamsRouter} from './routes/teams';
app.use("/teams", teamsRouter);
import {default as heroesRouter} from './routes/heroes';
app.use("/heroes", heroesRouter);

app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
