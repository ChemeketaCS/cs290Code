//Example of CommonJS Module Syntax
//This is what we will see/use

//require to load a module.
//binds carLib to module.exports from 'car.js'
const carLib = require("./car.js");  //Or require("./car")

console.log("carLib is a dict: ", carLib);

console.log("carLib.sampleCar: ", carLib.sampleCar);

console.log("calling carLib.makeCarSounds");
carLib.makeCarSounds();


