const express = require("express");
const app = express();
const port = 3000;

var serveIndex = require("serve-index");

app.use("/", express.static("."), serveIndex(__dirname + "/"));
//app.use(express.static("."));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
