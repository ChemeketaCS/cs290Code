import { default as express } from "express";
import { default as path } from "path";
import { default as cookieParser } from "cookie-parser";

// Create an express app
const app = express();

// Get the directory name of the current module
const __dirname = import.meta.dirname;

// view engine setup
app.set("view engine", "ejs");



//use middleware to parse the body of the request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Use database with mongoose
import { default as credentials } from "./dbCredentials.mjs";
import { default as mongoose } from "mongoose";
mongoose.connect(credentials.connection_string);

//Add in custom routes
import { default as heroesRouter } from "./routes/heroAPI.mjs";
app.use("/api", heroesRouter);

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

//---------------------------------------------------
// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(
    `Example app listening on port ${port} in directory ${__dirname}`
  );
});
