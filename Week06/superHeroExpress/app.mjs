import { default as express } from "express";
import { default as path } from "path";

// Create an express app
const app = express();

// Get the directory name of the current module
const __dirname = import.meta.dirname;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Look for static files first
app.use(express.static(path.join(__dirname, "public")));

//--------------------------------------------------------
//My routes

app.get("/", async (req, res) => {
  //send a plain file
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//All other routes in heroes.js file
import { default as heroRouter } from "./routes/heroes.mjs";
app.use("/heroes", heroRouter);

// catch any other route and send 404
app.use(function (req, res) {
  res.sendFile(path.join(__dirname, "public/404.html"));
});

//--------------------------------------------------------

// error handler
app.use(function (err, req, res, next) {
  console.log("In error handler")
  console.log(err)
  //If we have started sending results, need to let
  // default error handler take over
  if (res.headersSent) {
    return next(err)
  }

  // object to render in view
  let errDetails = { status: 500 };

  // add the message and stack trace from error
  errDetails.message = err.message;
  errDetails.stack = err.stack;

  // set error return code
  res.status(500);
  // render the error page
  res.render("error.ejs", errDetails);
});

//---------------------------------------------------
// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(
    `Example app listening on port ${port} in directory ${__dirname}`
  );
});
