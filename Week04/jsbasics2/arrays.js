console.log('-----------------------------');
console.log('Arrays');
console.log('-----------------------------');
let sequence = [1, 1, 2, 3, 5, 8, 13];
let randomStuff = ['tree', 795, [0, 1, 2]];

console.log(sequence);
console.log(randomStuff[1]);
randomStuff[0] = 'what???';
console.log(randomStuff);

let arrayDogs = ['Spot', 'Rover', 'Bella'];
let lastOne = arrayDogs.pop();
console.log(lastOne);
console.log(arrayDogs);
arrayDogs.push('Tramp');
console.log(arrayDogs);

// let lastOne = arrayDogs.pop();
// console.log(lastOne);
// console.log(arrayDogs);

arrayDogs.unshift('Lady');
console.log(arrayDogs);
let firstOne = arrayDogs.shift();
console.log(firstOne);
console.log(arrayDogs);

console.log('-----------------------------');
for (let i = 0; i < arrayDogs.length; i++) {
  console.log('item ', i, ' is ', arrayDogs[i]);
}

for (let dog of arrayDogs) {
  console.log(dog);
}

arrayDogs.forEach(function (dogName) {
  console.log(`Who's a good dog ${dogName}?`);
});

arrayDogs.forEach(function (dogName, index) {
  console.log(`${dogName} is the #${index + 1} dog.`);
});

arrayDogs.forEach( (dogName) => {
  console.log(`Who's a good dog ${dogName}?`);
});

arrayDogs.forEach( (dogName, index) => {
  console.log(`${dogName} is the #${index + 1} dog.`);
});

console.log(arrayDogs);
console.log(arrayDogs.indexOf('Bella'));
console.log(arrayDogs.indexOf('Tramp'));

console.log('-----------------------------');
console.log('Modifications');

let notacopy = arrayDogs;
notacopy.push('Odie');
console.log(arrayDogs);

function byeDog(arr) {
  arr.pop();
}
byeDog(arrayDogs);
console.log(arrayDogs);

let allButFirst = arrayDogs.slice(1);
console.log(allButFirst);

let firstTwo = arrayDogs.slice(0, 2);
console.log(firstTwo);

let dogsCopy = arrayDogs.slice();
dogsCopy.push('Mittens');
console.log(arrayDogs);
console.log(dogsCopy);

let cats = ['Midnight', 'Boots', 'Jasper'];
let critters = arrayDogs.concat(cats);
console.log(critters);
console.log(arrayDogs);

console.log('-----------------------------');

let date = "12/2/1986";
let dateParts = date.split("/");
console.log(dateParts);

let word = "hello";
let letters = word.split("");
console.log(letters);

let newDate = dateParts.join("--");
console.log(newDate);

console.log('-----------------------------');
console.log('Sorts');

console.log('sort() sorts alphabetically.... does not work on numbers!')
let array1 = [1, 30, 4, 21, 100000];
array1.sort();
console.log(array1);

function compareNumbers(a, b) {
  if(a < b)
    return -1;
  else if(a > b)
    return 1;
  return 0;
}
array1.sort(compareNumbers);
console.log(array1);

//Sort strings by length
console.log('Sort by name');
critters.sort();
console.log(critters);

console.log('Sort by name desc');
//Descending sort
critters.sort((a, b) => {
  if(a < b) return 1;
  if(a > b) return -1;
  return 0;
});  
console.log(critters);
//or
critters.sort().reverse();
console.log(critters);


console.log('Sort some numbers again:');
let numbers = [4, 2, 5, 1, 3];

//ascending
numbers.sort((a, b) => a - b);
console.log(numbers);

//Descending
numbers.sort((a, b) => b - a);
console.log(numbers);
//or
numbers.sort((a, b) => a - b).reverse();
console.log(numbers);

console.log('Sort by length');
//Ascending sort
function lengthCompare(strA, strB) {
  if (strA.length < strB.length) return -1;
  if (strA.length > strB.length) return 1;
  return 0;
}

critters.sort(lengthCompare);
critters.sort((a, b) => a.length - b.length);
//or
console.log(critters);

//Descending sort
console.log('Sort by length desc');
critters.sort(lengthCompare).reverse();
console.log(critters);
//or
critters.sort((a, b) => b.length - a.length);
console.log(critters);