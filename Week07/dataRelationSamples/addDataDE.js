//Loads the data stored in this data file:
const dataFile = require("./data.js");

//--------------------------------------------
//Connect to DB with Mongoose
const credentials = require("./dbCredentials.js");
const mongoose = require("mongoose");
mongoose.connect(credentials.connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Load our models
const E = require("./models/DE.js");

//Async function so we can use await to synchronize steps
let data = {
  name: "E one",
  Ds: [{ name: "D one" }, { name: "D two" }, { name: "D three" }],
};

async function loadAllRecords() {
  //Delete all existing records
  await E.deleteMany();

  let record = new E(data);
  await record.save();

  console.log("Done loading E");

  //Done with connection, close so program can exit
  mongoose.connection.close();
}

//Make it happen
loadAllRecords();
