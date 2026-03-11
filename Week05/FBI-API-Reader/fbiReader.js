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
  console.log(crimeObj);
  //Element to contain card and insert in layout
  let container = createElement('div', 'col-md-6');
  // createElement function replaces:
  // let container = document.createElement('div');
  // container.className = 'col-md-6';

  let card = createElement('div', 'card h-100');
  container.appendChild(card);

  // Content of card will be two rows - one for title/description and one for image and other data
  let row1 = createElement('div', 'row p-2');
  card.appendChild(row1);

  const cardTitle = createElement('h2', 'card-title', crimeObj.title);
  //Could/should style with CSS, just an example of directly setting style
  cardTitle.style.color = '#b13434';
  row1.appendChild(cardTitle);

  row1.appendChild(createElement('p', '', crimeObj.description));

  let row2 = createElement('div', 'row p-2');
  card.appendChild(row2);

  // Second row will have two columns - one for image and one for other data
  let leftCol = createElement('div', 'col-6');
  row2.appendChild(leftCol);

  //Images is an array. Each element has caption/thumb/large/original.
  // Try to grab from first image
  if (crimeObj.images.length > 0) {
    let img = createElement('img', 'img-fluid crimeImage');
    //Add an empty alt so screen readers don't read the file name of the image
    //Description is already in the text, no need to add it here
    img.setAttribute('alt', '');
    img.src = crimeObj.images[0].original;
    //Add image to left column
    leftCol.appendChild(img);
  }

  let rightCol = createElement('div', 'col-6');
  row2.appendChild(rightCol);

  //Check to see if there actually is a period field
  if (crimeObj.period) {
    rightCol.appendChild(createElement('h3', '', 'Period:'));
    rightCol.appendChild(createElement('p', '', crimeObj.period));
  }

  //Assume crimeCategory field exist...
  rightCol.appendChild(createElement('h3', '', 'Type:'));
  rightCol.appendChild(createElement('p', '', crimeObj.crimeCategory));

  if (crimeObj.additionalData) {
    let keywords = crimeObj.additionalData.split('; ');
    if (keywords.length > 0) {
      rightCol.appendChild(createElement('h3', '', 'Keywords:'));
      let keywordList = createElement('ul', '');
      rightCol.appendChild(keywordList);
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