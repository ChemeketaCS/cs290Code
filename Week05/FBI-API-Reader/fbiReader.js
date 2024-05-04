//Add an event handler to the button for when it is clicked
const searchBtn = document.querySelector('#go');
searchBtn.addEventListener('click', doSearch);

//Add an event handler to the textbox - when it is focused
// and enter is pressed, do a search
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

  // //Alternative way to clear all child elements
  // crimesDiv.innerHTML = '';

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
  } catch (error) {
    console.error('Error:', error);
  }
}

//Given an object produce div containing data
//Returns div to be added into layout
function createCard(crimeObj) {
  //Element to contain card and insert in layout
  let container = createElement('div', 'col-md-6');
  // createElement function replaces:
  // let container = document.createElement('div');
  // container.className = 'col-md-6';

  let card = createElement('div', 'card h-100 d-flex justify-content-center align-items-center');
  container.appendChild(card);

  // row to layout contents of card
  let rowDiv = createElement('div', 'row g-0 p-2');
  card.appendChild(rowDiv);

  // Make a left column in row
  let leftCol = createElement('div', 'col-6 d-flex justify-content-center align-items-center');
  rowDiv.appendChild(leftCol);

  //Images is an array. Each element has caption/thumb/large/original.
  // Try to grab from first image
  if (crimeObj.images.length > 0) {
    let img = createElement('img', 'img-fluid crimeImage');
    //Add an alt to the image
    img.setAttribute('alt', crimeObj.images[0].caption);
    img.src = crimeObj.images[0].large;
    //Add image to left column
    leftCol.appendChild(img);
  }

  let rightCol = createElement('div', 'col-6');
  rowDiv.appendChild(rightCol);
  let cardBody = createElement('div', 'card-body');
  rightCol.appendChild(cardBody);

  const cardTitle = createElement('h2', 'card-title', crimeObj.title);
  //Could/should style with CSS, just an example of directly setting style
  cardTitle.style.color = '#b13434';
  cardBody.appendChild(cardTitle);

  //Assume description field exist...
  cardBody.appendChild(createElement('p', '', crimeObj.description));

  //Check to see if there actually is a period field
  if (crimeObj.period) {
    cardBody.appendChild(createElement('h3', '', 'Period:'));
    cardBody.appendChild(createElement('p', '', crimeObj.period));
  }

  //Assume crimeCategory field exist...
  cardBody.appendChild(createElement('h3', '', 'Type:'));
  cardBody.appendChild(createElement('p', '', crimeObj.crimeCategory));

  if (crimeObj.additionalData) {
    let keywords = crimeObj.additionalData.split('; ');
    if (keywords.length > 0) {
      cardBody.appendChild(createElement('h3', '', 'Keywords:'));
      let keywordList = createElement('ul', '');
      cardBody.appendChild(keywordList);
      for (let k of keywords) {
        keywordList.appendChild(createElement('li', '', k));
      }
    }
  }

  return container;
}

//Make an element, set some classes, and optionally set some data
function createElement(type, classes, data = null) {
  let el = document.createElement(type);
  el.className = classes;
  if (data) {
    el.innerHTML = data;
  }
  return el;
}

//Trigger the search when the page loads
doSearch();