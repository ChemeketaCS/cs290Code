//--------------------------------------------
//Data that we will load into MongoDB
const teamList = [
  {
    squadName: "Super hero squad",
    homeTown: "Metro City",
    formed: Date.parse("1995-01-20"),
    active: true,
  },
  {
    squadName: "Just us league",
    homeTown: "Midtown",
    formed: Date.parse("2003-08-03"),
    active: true,
  },
];

const heroesList = [
  {
    name: "Molecule Man",
    age: 29,
    secretIdentity: "Dan Jukes",
    powers: ["Radiation resistance", "Turning tiny", "Radiation blast"],
  },
  {
    name: "Green Dart",
    age: 27,
    secretIdentity: "Blake Davis",
    powers: ["Really good aim"],
  },
  {
    name: "Elastic Lady",
    age: 27,
    secretIdentity: "Sue Vega",
    powers: ["Stretchy", "Shape Shifting", "Physical Damage Resistance"],
  },
  {
    name: "Madame Uppercut",
    age: 39,
    secretIdentity: "Jane Wilson",
    powers: ["Million tonne punch", "Damage resistance", "Superhuman reflexes"],
  },
  {
    name: "Eternal Flame",
    age: 1000000,
    secretIdentity: "Unknown",
    powers: [
      "Immortality",
      "Heat Immunity",
      "Inferno",
      "Teleportation",
      "Interdimensional travel",
    ],
  },
];

//--------------------------------------------
//Connect to DB with Mongoose
const credentials = require("./dbCredentials.js");
const mongoose = require("mongoose");
mongoose.connect(credentials.connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Load our models
const Hero = require("./models/hero");
const Team = require("./models/team");

//Async function so we can use await to synchronize steps
async function loadAllRecords() {
  //Delete all existing records
  await Team.deleteMany({});
  await Hero.deleteMany({});

  //Will use this to store a list of all our teams
  const teamRecords = [];

  //Take the teams we have data for and use them to make records with out schema
  teamList.forEach(async function (teamItem) {
    //Make a Team from Schema
    const teamRecord = new Team(teamItem);
    //Add it to a list for connecting with heros
    teamRecords.push(teamRecord);
    //Save it to mongodb
    await teamRecord.save();
  });

  //List to store promises for heros so we can start saving them
  // simultaneously and then wait for all to finish
  let heroPromises = [];

  //upload all the heroes from heroesList
  heroesList.forEach(async function (heroItem, index) {
    //Make a Hero from Schema
    const heroRecord = new Hero(heroItem);

    //Assign the first three to team[0], rest to team[1]
    if (index < 3) {
      heroRecord.team = teamRecords[0];
    } else {
      heroRecord.team = teamRecords[1];
    }

    //Save it to mongodb - don't wait, instead
    //add the promise to a list
    let savePromise = heroRecord.save();
    heroPromises.push(savePromise);
  });

  //wait for all the hero promises to resolve
  await Promise.all(heroPromises);

  console.log("Done loading data");

  //Done with connection, close so program can exit
  mongoose.connection.close();
}

//Make it happen
loadAllRecords();
