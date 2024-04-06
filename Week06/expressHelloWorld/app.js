import {default as express} from 'express';
const app = express();

// Listen for get requests
// Attempt to get root site, return index.html
app.get("/", (req, res) => {
  let fileName = __dirname + "/public/index.html";
  res.sendFile(fileName);
});

// Attempt to get other file, try to return that file name from public/
app.get("/:name", (req, res) => {
  let name = req.params.name; //:name automatically becomes this

  //if no name specified, assume index.html
  if(name === undefined)
    name = "index.html"

  let fileName = __dirname + "/public/" + name;
  res.sendFile(fileName);
});

// catch 404 and forward to error handler
app.use(function(req, res) {
  res.status(404);
  res.send('Error - file not found. Try /index.html');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})