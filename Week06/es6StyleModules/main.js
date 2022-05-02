//Example of ES6 Module Syntax
//We will not be using this!!!

console.log("Hello there from main.js");

//Import other.js as a module
import * as Other from './other.js';

//Use features that were exported by the module
Other.sayHello();
console.log("Other.answer is ", Other.answer);

////Can't use this, was not exported
//Other.privateFunction();