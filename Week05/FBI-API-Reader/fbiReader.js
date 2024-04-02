//Add an event handler to the button
const searchBtn = document.querySelector('#go');
searchBtn.addEventListener('click', doSearch);
const inputBox = document.querySelector('#inputTextbox');
inputBox.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    doSearch();
  }
});

//Function to do query when button pressed
async function doSearch() {
  //Find the text field by ID and get the value from it
  const inputBox = document.querySelector('#inputTextbox');
  const pageNumber = inputBox.value;

  const numResultsPerPage = 20;
  
  //Find the div with the recipes
  const crimesDiv = document.querySelector('#crimes');

  //Newer way to clear all child elements
  crimesDiv.replaceChildren([]);

  // //Older way of clearing children
  // for (let c of crimesDiv.children) {
  //     c.remove();
  // }

  try {
    //Do request
    let response = await fetch(`https://api.fbi.gov/@artcrimes?pageSize=${numResultsPerPage}&page=${pageNumber}`);

    if (!response.ok) throw 'Issue with request: ' + response;
    
    //Read json data from request
    let data = await response.json();

    //Turn each into a card and add to layout
    for (const crime of data.items) {
      let crimeElement = createCard(crime);
      crimesDiv.appendChild(crimeElement);
    }
  } catch(error) {
    console.error('Error:', error);
  }
}

//Given an object produce div containing data
//Returns div to be added into layout
function createCard(crimeObj) {
  let container = createElementWithData('div', '');

  let card = createElementWithData('div', 'card h-100');
  container.appendChild(card);
  
  //images is an array. Each element has caption/thumb/large/original.
  // Try to grab from first image
  if (crimeObj.images.length > 0) {
    let img = createElementWithData('img', 'card-img-top');
    //add an alt to the image
    img.setAttribute('alt', crimeObj.images[0].caption);
    img.src = crimeObj.images[0].large;
    card.appendChild(img);
  }


  const cardHead = createElementWithData('div', 'card-header');
  cardHead.style.backgroundColor = getColorCode(crimeObj.crimeCategory);
  card.appendChild(cardHead);

  let cardTitle = createElementWithData('h2', 'card-title', crimeObj.title);
  cardHead.appendChild(cardTitle);

  let cardBody = createElementWithData('div', 'card-body');
  card.appendChild(cardBody);
  
  //Assume this field exist...
  cardBody.appendChild(createElementWithData('p', '', crimeObj.description));

  //Check to see if there actually is a period field
  if (crimeObj.period) {
    cardBody.appendChild(createElementWithData('h3', '', 'Period:')); 
    cardBody.appendChild(createElementWithData('p', '', crimeObj.period)); 
  }

  //Assume this field exist...
  cardBody.appendChild(createElementWithData('h3', '', 'Type:')); 
  cardBody.appendChild(createElementWithData('p', '', crimeObj.crimeCategory));

  if(crimeObj.additionalData) {
    let keywords = crimeObj.additionalData.split('; ');
    if(keywords.length > 0) {
      cardBody.appendChild(createElementWithData('h3', '', 'Keywords:')); 
      let keywordList = createElementWithData('ul', '');
      cardBody.appendChild(keywordList);
      for (let k of keywords) {
        keywordList.appendChild(createElementWithData('li', '', k));
      }
    }
  }

  return container;
}

//Make an element, set some classes, and optionally set some data
function createElementWithData(type, classes, data = null) {
  let el = document.createElement(type);
  el.className = classes;
  if(data) {
    el.innerHTML = data;
  }
  return el;
}

//Given a type of art, return a color
function getColorCode(category) {
  switch(category) {
    case 'paintings':
      return 'rgb(10, 200, 10)';
    case 'coins-and-paper-money':
      return 'rgb(200, 220, 200)';
    case 'sculpture':
      return 'rgb(200, 100, 200)';
  }
  return 'rgb(10, 200, 200)';
}

//Trigger the search when the page loads
doSearch();