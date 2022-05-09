//--------------------------------------------
//Connect to DB with Mongoose
const credentials = require("./dbCredentials.js");
const mongoose = require("mongoose");
mongoose.connect(credentials.connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Create a schema
let CitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  population: { type: Number, required: true },
});

//Create a model from the schema
let City = mongoose.model("City", CitySchema);

//Use the model to make an object
const metropolis = new City({
  name: "Metropolis",
  population: 10000042,
});

//Save it to the database, receive promise
let saveResult = metropolis.save();

//Wait until done, then disconnect
saveResult.then((data) => {
  console.log(data);
  mongoose.disconnect();
});
