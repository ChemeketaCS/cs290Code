//Add an event handler to the button
const searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("click", loadYeasts);

function loadYeasts() {
  const yeastName = document.querySelector("#yeast");
  const recipesList = document.querySelector("#recipes");

  //Newer way to clear existing recipes
  recipesList.replaceChildren([]);

  // //Older way of clearing children
  // for (let c of recipesList.children) {
  //     c.remove();
  // }
  let a = 0;
  let x = 0;
  switch (a) {
    case 1:
      x = 10;
  }

  fetch("https://api.punkapi.com/v2/beers?per_page=20&yeast=" + yeastName.value)
    .then((response) => {
      if (!response.ok) console.error("Issue with request:", response);

      return response.json();
    })
    .then((data) => {
      //Have JSON - array of recipes - sort by recipe name
      data.sort((a, b) => {
        let nameA = a.name.toLowerCase(),
          nameB = b.name.toLowerCase();
        if (nameA < nameB)
          //sort string ascending
          return -1;
        if (nameA > nameB) return 1;
        return 0;
      });

      //Turn each into a card and add to layout
      for (const recipeObj of data) {
        console.log(recipeObj);

        let recipeElement = createBeerCard(recipeObj);
        recipesList.appendChild(recipeElement);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

//Given an object for a beer recipe, produce a formatted HTML
// representation
//Returns div to be added into layour
function createBeerCard(recipeObj) {
  let container = createElementWithClass("div", "");

  let card = createElementWithClass("div", "card h-100");
  container.appendChild(card);

  const cardHead = createElementWithClass("div", "card-header");
  cardHead.style.backgroundColor = getSRMColor(recipeObj.srm);
  //Dark backgrounds need light text...
  if (recipeObj.srm > 10) cardHead.style.color = "#f0f0e8";

  cardHead.innerHTML = `<h2 class="card-title">${recipeObj.name}</h2>`;
  card.appendChild(cardHead);

  let cardBody = createElementWithClass("div", "card-body");
  //Build up all the HTML inside card as a string
  let cardBodyString = "";
  cardBodyString += `<p><em class="card-text">${recipeObj.tagline}</em></p>`;
  if ("ingredients" in recipeObj) {
    if ("malt" in recipeObj.ingredients) {
      cardBodyString += "<h3>Malts:</h3>";
      cardBodyString += "<ul>";
      for (let m of recipeObj.ingredients.malt) {
        cardBodyString += `<li>${m.name}</li>`;
      }
      cardBodyString += "</ul>";
    }
    console.log(cardBody.innerHTML);
    if ("hops" in recipeObj.ingredients) {
      cardBodyString += "<h3>Hops:</h3>";
      cardBodyString += "<ul>";
      for (let h of recipeObj.ingredients.malt) {
        cardBodyString += `<li>${h.name}</li>`;
      }
      cardBodyString += "</ul>";
    }
    if ("yeast" in recipeObj.ingredients) {
      cardBodyString += "<h3>Yeast:</h3>";
      cardBodyString += `<p>${recipeObj.ingredients.yeast}</p`;
    }
  }
  cardBody.innerHTML = cardBodyString;
  card.appendChild(cardBody);

  return container;
}

//Make an element and set one or more classes
function createElementWithClass(type, classes) {
  let el = document.createElement(type);
  el.className = classes;
  return el;
}

//Accept SRM value of 1+. Return color based on that value.
//SRM's of 30+ all have same color as 30
function getSRMColor(srmValue) {
  //SRM Codes from https://codepen.io/simonja2/pen/zvGxdG
  const srmCodes = [
    "#FFE699",
    "#FFD878",
    "#FFCA5A",
    "#FFBF42",
    "#FBB123",
    "#F8A600",
    "#F39C00",
    "#EA8F00",
    "#E58500",
    "#DE7C00",
    "#D77200",
    "#CF6900",
    "#CB6200",
    "#C35900",
    "#945534",
    "#925536",
    "#844C33",
    "#744229",
    "#683A22",
    "#573512",
    "#492A0B",
    "#3A2102",
    "#361F1B",
    "#261716",
    "#231716",
    "#19100F",
    "#16100F",
    "#120D0C",
    "#100B0A",
    "#050B0A",
  ];

  return srmCodes[Math.min(Math.floor(srmValue), 30) - 1];
}
