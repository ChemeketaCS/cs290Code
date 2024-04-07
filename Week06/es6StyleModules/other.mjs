//Example of ES6 Module Syntax

let answer = 42;
let question = "What is the meaning of life, the universe, and everything?";
//Declare that question and answer are exported
export { question, answer };

//Declare that addOne is exported as it is defined
export function addOne(x) {
  return x + 1;
}

//Declare that sayHello is the "default" export
export default function sayHello() {
  console.log("Hello from other.js");
}

//Not exported, main.js won't be able to see this function
function privateFunction() {
  console.log("Only for local use in this module");
}
