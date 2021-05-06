const ejs = require("ejs");

ejs.renderFile(
  "views/basic.ejs",
  {
    name: "Andrew <b>Scholer</b>",
    age: 47,
  },
  function (err, result) {
    if (err) console.log("ERROR - " + err);
    console.log(result);
  }
);
