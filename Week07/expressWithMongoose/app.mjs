import { default as express } from "express";
import { default as path } from "path";
import { default as cookieParser } from "cookie-parser";

// Create an express app
const app = express();

// Get the directory name of the current module
const __dirname = import.meta.dirname;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Use database with mongoose
import { default as credentials } from "./dbCredentials.mjs";
import { default as mongoose } from "mongoose";
mongoose.connect(credentials.connection_string);

//Try to serve request as a static file from public dir
app.use(express.static(path.join(__dirname, "public")));

//Add in custom routes
import { default as teamsRouter } from "./routes/teams.mjs";
app.use("/teams", teamsRouter);
import { default as heroesRouter } from "./routes/heroes.mjs";
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

//---------------------------------------------------
// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(
    `Example app listening on port ${port} in directory ${__dirname}`
  );
});
