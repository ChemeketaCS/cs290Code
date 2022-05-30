const express = require("express");
const app = express();
const port = 3000;

var serveIndex = require("serve-index");

app.use("/", express.static("."), serveIndex(__dirname + "/"));

app.listen(port, () => {
  console.log("Running out of the root folder of cs290Code.");
  console.log(
    "If you are trying to run a node based sample (week 6+), make sure to run"
  );
  console.log(
    "the start command from the folder of the project you want to run."
  );
  console.log(`Example app listening at http://localhost:${port}`);
});
