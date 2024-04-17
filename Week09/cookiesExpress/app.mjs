import { default as express } from "express";
import { default as path } from "path";

// Create an express app
const app = express();

// Get the directory name of the current module
const __dirname = import.meta.dirname;

//Automatically convert cookie strings to js objects available in request
import { default as cookieParser } from "cookie-parser";
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

import { default as indexRouter } from "./routes/index.mjs";
import { default as usersRouter } from "./routes/users.mjs";

app.use("/", indexRouter);
app.use("/users", usersRouter);

//---------------------------------------------------
// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(
    `Example app listening on port ${port} in directory ${__dirname}`
  );
});
