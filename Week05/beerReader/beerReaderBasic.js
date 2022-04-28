
const recipes = document.querySelector("#recipes");

//Newer way to clear existing recipes
recipes.replaceChildren([]);

// //Older way of clearing children
// for (let c of recipes.children) {
//     c.remove();
// }
// //OR
// recipes.innerHTML = ""

fetch("https://api.punkapi.com/v2/beers?per_page=20")
.then((response) => {
  if (!response.ok) console.error("Issue with request:", response);
  return response.json();
})
.then((data) => {
  console.log(data);

  //start a string with the new HTML we will add
  let newHTML = "";

  //Turn each into a card and add to the newHTML
  for (const recipeObj of data) {
    console.log(recipeObj);

    let recipeHTML = createBeerCard(recipeObj);
    console.log(recipeHTML);

    newHTML += recipeHTML;
    console.log(newHTML);
  }

  //Now add the entire string to the end of recipes element
  recipes.innerHTML += newHTML;
})
.catch((error) => {
  console.error("Error:", error);
});


//Given an object for a beer recipe, produce a formatted HTML
// representation
//Returns a string
function createBeerCard(recipeObj) {
  //Using spaces and newlines will make it easier to read what gets generated
  let resultString = "<div><div class='card h-100'>\n";
  resultString    += "  <div class='card-header'>\n";
  resultString    += `    <h2 class='card-title'>${recipeObj.name}</h2>\n`;
  resultString    += "  </div>\n";
  resultString    += "  <div class='card-body'>\n";
  //Not all recipes have malt or yeast listed...
  if ("malt" in recipeObj.ingredients) {
    resultString  += "    <h3>Malts:</h3>\n";
    resultString  += "    <ul>\n";
    for (let m of recipeObj.ingredients.malt) {
      resultString += `      <li>${m.name}</li>\n`;
    }
    resultString  += "    </ul>\n";
  }
  if ("yeast" in recipeObj.ingredients) {
    resultString  += "    <h3>Yeast:</h3>\n";
    resultString  += `    <p>${recipeObj.ingredients.yeast}</p>\n`;
  }
  resultString    += "  </div>\n";
  resultString    += "</div></div>\n";
  return resultString;
}
