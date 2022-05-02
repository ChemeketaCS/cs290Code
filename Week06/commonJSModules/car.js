//Example of CommonJS Module Syntax
//This is what we will see/use


const car = {
  brand: "Ford",
  model: "Fiesta",
};

function makeCarSounds() {
  console.log("Vrooooooom!");
}

// Export is a dict of key/value pairs. 
// Key is external name, value internal name. Can be same or different
module.exports = {
  sampleCar: car,               //External code asks for sampleCar, gets car
  makeCarSounds: makeCarSounds, //External code asks for and gets makeCarSounds
};

// //Also could export items one at a time like this:
// module.exports.sampleCar = car;
// module.exports.makeNoise = makeCarSounds;
