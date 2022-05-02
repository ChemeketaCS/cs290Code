//node-fetch is a module available through npm
// Version 3 of node-fetch is ES6 style module - have to "import" not "require"
//Need to install node-fetch with npm to have this work!
import fetch from 'node-fetch';

//Version 2 of node-fetch was a commonjs module - used this syntax:
//let fetch = require("node-fetch");

fetch("https://api.punkapi.com/v2/beers?per_page=4&yeast=05")
  .then(function (response) {
    if (response.status == 200) {
      return response.json();
    } else throw response.status + " " + response.statusText;
  })
  .then(function (json) {
    let recipes = json;
    console.log(recipes);
  })
  .catch(function (err) {
    console.log("Fetch problem: " + err.message);
  });


// //Same idea, but implemented with async/await
// async function main() {
//   try {
//     let response = await fetch(
//       "https://api.punkapi.com/v2/beers?per_page=4&yeast=05"
//     );
//     let json = await response.json();
//     console.log(json);
//   } catch (except) {
//     console.log(except);
//   }
// }

// main();
