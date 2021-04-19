console.log("Hello there from the included file");

//this is not javascript!!!

//A comment for this line
let x = 10;

/* a multi-line
 comment */
for (let i = 0; i < x; i++) {
  console.log(i);
}

// if (true) {
//   a = "a is here!";
// }
// console.log(a);

// console.log(wtf);
// if (true) {
//   var wtf = "This is valid???";
// }

let message = "Yes";

const number = 42;

console.log(message, number);

let myVar = "apple";
console.log(typeof myVar);
myVar = 3.14159;
console.log(typeof myVar);

let area = 50;
let radius = Math.sqrt(area / Math.PI);
console.log(radius);

3 / 2; //1.5
Math.trunc(3 / 2); //1

let myString = "abc";
myString = myString + "defg";

console.log(myString.length);
console.log(myString[2]);
console.log(myString.indexOf("s"));
console.log(myString.substr(2, 4));
console.log(myString.slice(2, 4));
console.log(myString.replace("defg", "xxxx"));
console.log(myString);
myString = myString.replace("defg", "xxxx");
console.log(myString);

let myFormattedString = `Radius is ${radius}`;
console.log(myFormattedString);
myFormattedString = `Radius is ${radius.toFixed(3)}`;
console.log(myFormattedString);

let a1 = 1 + "2"; //12
let a2 = 1 < "2"; //true... "2" becomes 2
let a3 = 1 < "asdf"; //false... "asdf" becomes 0

var temp = "";

if (temp === false) {
  console.log("whooops");
}

let anum = Number("123");
console.log("anum is " + anum);
let anum2 = Number("bob3");
console.log("anum2 is " + anum2);

let bool1 = Boolean("1");
console.log("bool1 is " + bool1);
let bool2 = Boolean("0");
console.log("bool2 is " + bool2);
let bool3 = Boolean(0);
console.log("bool3 is " + bool3);
let bool4 = Boolean("");
console.log("bool4 is " + bool4);
