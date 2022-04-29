//Example of ES6 Module Syntax
//We will not be using this!!!

let answer = 42;

function sayHello() {
  console.log("Hello from other.js");
}

//Not exported, main.js won't see this function
function privateFunction() {
  console.log("Only for local use in this module");
}

//Declare the things that are available outside this file
export {sayHello, answer}

