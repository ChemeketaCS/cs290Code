//Example of ES6 Module Syntax
//We will not be using this!!!

console.log("Hello there from main.js");

//Import question and answer from other.js
import { question, answer } from './other.mjs';
console.log("Other.question is ", question);
console.log("Other.answer is ", answer);

//Import question and answer from other.js and rename them
import { question as OtherQ, answer as OtherA } from './other.mjs';
console.log("Other.question is ", OtherQ);
console.log("Other.answer is ", OtherA);

//Import all the things from Other and next them under Other namespace
import * as Other from './other.mjs';
console.log("Other.question is ", Other.question);
console.log("Other.answer is ", Other.answer);

//Import the default export from Other and call it OtherDefault
import OtherDefault from './other.mjs';
console.log("Using default export from Other");
OtherDefault();

////Can't use this, was not exported
//Other.privateFunction();