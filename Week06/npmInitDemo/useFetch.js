//node-fetch is a module available through npm
// Version 3 of node-fetch is ES6 style module - have to "import" not "require"
//Need to install node-fetch with npm to have this work!
//Install with "npm install node-fetch"
import fetch from "node-fetch";
//Must also make sure package.json specifies "type": "module"

//Using await syntax for fetch. Must put inside async function
async function getData() {
  try {
    let response = await fetch(
      "https://api.punkapi.com/v2/beers?per_page=4&yeast=34"
    );
    if (response.status !== 200)
      throw response.status + " " + response.statusText;
    let json = await response.json();
    console.log(json);
  } catch (except) {
    console.log(except);
  }
}
//Call the function
getData();

// //Do the same thing with .then syntax - can run as code not in a function
// fetch("https://api.punkapi.com/v2/beers?per_page=4&yeast=34")
//   .then(function (response) {
//     if (response.status === 200) {
//       return response.json();
//     } else throw response.status + " " + response.statusText;
//   })
//   .then(function (json) {
//     let recipes = json;
//     console.log(recipes);
//   })
//   .catch(function (err) {
//     console.log("Fetch problem: " + err.message);
//   });
