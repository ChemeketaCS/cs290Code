const carLib = require("./car");
//carLib is now bound to module.exports from 'car.js'

console.log(carLib);

console.log(carLib.sampleCar);

carLib.makeNoise();
