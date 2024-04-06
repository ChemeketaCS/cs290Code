import {default as express} from 'express';
import {default as path} from 'path';
import {default as logger} from 'morgan';

var app = express();

//Automatically convert cookie strings to js objects available in request
import {default as cookieParser} from 'cookie-parser';
app.use(cookieParser());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

import {default as indexRouter} from './routes/index';
import {default as usersRouter} from './routes/users';

app.use("/", indexRouter);
app.use("/users", usersRouter);

module.exports = app;
