//Example of CommonJS Module Syntax
//We will avoid this as much as possible

//require to load a module.
//binds carLib to module.exports from 'car.js'
const carLib = require("./car.cjs"); //Or require("./car")

console.log("carLib is a dict: ", carLib);

console.log("carLib.sampleCar: ", carLib.sampleCar);

console.log("calling carLib.makeCarSounds");
carLib.makeCarSounds();
