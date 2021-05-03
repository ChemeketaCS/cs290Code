// car.js
const car = {
  brand: "Ford",
  model: "Fiesta",
};

function makeCarSounds() {
  console.log("Vrooooooom!");
}

//Export multiple items as properties of module.exports
module.exports = {
  sampleCar: car,
  makeNoise: makeCarSounds,
};

// //Export single item
// module.exports.sampleCar = car;
