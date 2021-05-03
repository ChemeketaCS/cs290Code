const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/test", (req, res) => {
  res.send("You accessed /test");
});

app.get("/secret.html", (req, res, next) => {
  console.log("We are here...");
  //Add something to response
  res.body = "Start of message...<br>";
  next(); //continue processing this
});

app.get("/secret.html", (req, res) => {
  console.log("...and here");
  res.body += "...end of message";
  res.send(res.body); //send the body we built
});

app.get("/products/secret", (req, res) => {
  res.send("A secret product");
});

var productsRouter = require("./routes/products");
app.use("/products", productsRouter);

//If all else fails, try the public dir to serve a static file
app.use(express.static("public"));
app.use(express.static("otherFiles"));

//Catch any other request
app.get("*", function (req, res) {
  res.status(404);
  res.sendFile(__dirname + "/public/404.html");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
