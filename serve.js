const express = require('express');
const serveIndex = require('serve-index');
const app = express();

app.use("/",serveIndex('.') );
app.use(express.static('.'));

const port = 3000;
app.listen(port, () => {
  console.log(`Listening ${port}`)
})