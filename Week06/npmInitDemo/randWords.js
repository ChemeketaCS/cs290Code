//Use this package https://www.npmjs.com/package/random-words

//Installed by doing:
//npm install random-words

//Bring in the library
import {default as randomWords} from 'random-words';

//Get some words
let words = randomWords(20)

console.log(words);