console.log("-----------------------------");
console.log("Arrays");
console.log("-----------------------------");
let sequence = [1, 1, 2, 3, 5, 8, 13];
let randomStuff = ["tree", 795, [0, 1, 2]];

console.log(sequence);
console.log(sequence[3]);
randomStuff[0] = "what???";
console.log(randomStuff);

for (let i = 0; i < sequence.length; i++) {
  console.log(sequence[i]);
}

let doggos = "Spot Rover Bella";
let arrayDogs = doggos.split(" ");
console.log(arrayDogs);
console.log(arrayDogs.join("---"));

arrayDogs.push("Tramp");
console.log(arrayDogs);
let lastOne = arrayDogs.pop();
console.log(lastOne);
console.log(arrayDogs);

arrayDogs.unshift("Lady");
console.log(arrayDogs);
let firstOne = arrayDogs.shift();
console.log(firstOne);
console.log(arrayDogs);

console.log("-----------------------------");
for (let i = 0; i < arrayDogs.length; i++) {
  console.log("item ", i, " is ", arrayDogs[i]);
}

for (let dog of arrayDogs) {
  console.log(dog);
}


arrayDogs.forEach(function (dogName) {
  console.log("Who's a good dog " + dogName + "?");
});

arrayDogs.forEach(function (dogName, index) {
  console.log(`${dogName} is the #${index + 1} dog.`);
});

arrayDogs.forEach((dogName) => {
  console.log("Who's a good dog " + dogName + "?");
});

arrayDogs.forEach((dogName, index) => {
  console.log(`${dogName} is the #${index + 1} dog.`);
});

console.log(arrayDogs.indexOf("Bella"));
console.log(arrayDogs.indexOf("Tramp"));

console.log("-----------------------------");

let notacopy = arrayDogs;
notacopy.push("Odie");
console.log(arrayDogs);

function byeDog(arr) {
  arr.pop();
}
byeDog(arrayDogs);
console.log(arrayDogs);

let allButFirst = arrayDogs.slice(1);
let firstTwo = arrayDogs.slice(0, 2);
console.log(allButFirst);
console.log(firstTwo);

let dogsCopy = arrayDogs.slice();
dogsCopy.push("Mittens");
console.log(arrayDogs);
console.log(dogsCopy);

let cats = ["Midnight", "Boots", "Jasper"];
let critters = arrayDogs.concat(cats);
console.log(critters);
console.log(arrayDogs);

console.log("-----------------------------");

let array1 = [1, 30, 4, 21, 100000];
array1.sort();
console.log(array1);

function compareNumbers(a, b) {
  return a - b;
}
array1.sort(compareNumbers);
console.log(array1);

let numbers = [4, 2, 5, 1, 3];

numbers.sort((a, b) => a - b);
console.log(numbers);

numbers.sort((a, b) => b - a);
console.log(numbers);

//Long to short
critters.sort((a, b) => b.length - a.length);
console.log(critters);
