//Test out accessing data

import { default as mongoose } from "mongoose";

//Create a schema
let CitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  population: { type: Number, required: true },
});

//Create a model from the schema
let City = mongoose.model("City", CitySchema);

//Connect to DB with Mongoose
import { default as credentials } from "./dbCredentials.mjs";
mongoose.connect(credentials.connection_string);

//Get all cities - returns a promise
let findResult = City.find().exec();

//Wait for promise to resolve
findResult.then((data) => {
  //Print result
  console.log(data);
  console.log("First city's name is:", data[0].name);
  //close DB connection, allow script to end
  mongoose.connection.close();
});