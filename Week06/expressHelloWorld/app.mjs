import { default as fs } from "fs"; // Filesystem module
import { default as express } from "express";

// Create an express app
const app = express();

// Get the directory name of the current module
const __dirname = import.meta.dirname;

// Listen for get requests
// On attempt to get site root, return index.html
app.get("/", (req, res) => {
  let fileName = __dirname + "/public/index.html";
  res.sendFile(fileName);
});

// Attempt to get other file, try to return that file name from public/
app.get("/other.html", (req, res, next) => {
  // Get the full path to the file
  let fileName = __dirname + "/public/other.html";
  // Check if the file exists
  if (fs.existsSync(fileName)) {
    res.sendFile(fileName);
  } else {
    // If the file does not exist, call the next middleware
    next();
  }
});

// Give up and return a 404 error
app.use(function (req, res) {
  res.status(404);
  res.type("txt");
  res.send("Error - file not found. Try /index.html");
});

//---------------------------------------------------
// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(
    `Example app listening on port ${port} in directory ${__dirname}`
  );
});
