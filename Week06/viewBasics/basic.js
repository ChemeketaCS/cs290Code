import {default as ejs} from 'ejs';

//Just use ejs to render a template to the console
let data = {
  name: "Andrew <b>Scholer</b>",
  age: 47,
};
ejs.renderFile(
  "views/basic.ejs",
  data,
  function (err, result) {
    if (err) console.log("ERROR - " + err);
    console.log(result);
  }
);

//List I want to pass to template
let myList = ["Thing one", "Thing two"];
let bindObject = {};
bindObject.list = myList;
ejs.renderFile("views/list-view.ejs", bindObject, function (err, result) {
  if (err) console.log("ERROR - " + err);
  console.log(result);
});
