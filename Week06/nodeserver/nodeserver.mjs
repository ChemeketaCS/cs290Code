//A simple server created directly with node
//Not what we will actually do!!!

import { default as http } from "http";
import { default as fs } from "fs";

const port = 3000;

const server = http.createServer((req, res) => {
  console.log("Request for " + req.url);

  try {
    let file = req.url.slice(1); //get all but first char which is /

    if (file === "") {
      file = "index.html";
    }

    //If file does not exist, is 404
    if (!fs.existsSync(file)) {
      res.statusCode = 404;
      res.end("No such file " + req.url);
      return;
    }

    //Try to read and return the file
    const data = fs.readFileSync(file);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end(data);
  } catch (err) {
    res.statusCode = 500;
    console.log(err);
    res.end("<p>Server fail. Please check the logs</p>");
  }
});

server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
