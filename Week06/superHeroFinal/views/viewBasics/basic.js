const ejs = require("ejs");

//Just use ejs to render a template to the console
ejs.renderFile(
  "views/basic.ejs",
  {
    name: "Andrew <b>Scholer</b>",
    //age: 47,
  },
  function (err, result) {
    if (err) console.log("ERROR - " + err);
    console.log(result);
  }
);
