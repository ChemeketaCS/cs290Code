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
import {default as credentials} from './dbCredentials.js';
import {default as mongoose} from 'mongoose';
mongoose.connect(credentials.connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Load our models
import {default as Hero} from './models/hero.js';
import {default as Team} from './models/team.js';

//Basic version of loading/reloading records - not actually called
//Just provided for illustration
//Async function so we can use await to synchronize steps
async function sampleSimpleLoad() {
  //Get rid of existing teams
  await Team.deleteMany();

  //Make JS object using model and some hard coded data
  const teamRecord1 = new Team({
    squadName: "Super hero squad",
    homeTown: "Metro City",
    formed: Date.parse("1995-01-20"),
    active: true,
  });
  //Tell it to save itself to database
  await teamRecord1.save();

  //Now do another record
  const teamRecord2 = new Team({
    squadName: "Just us league",
    homeTown: "Midtown",
    formed: Date.parse("2003-08-03"),
    active: true,
  });
  await teamRecord2.save();
  mongoose.connection.close();
}

//Async function so we can use await to synchronize steps
async function loadAllRecords() {
  //Delete all existing records
  await Team.deleteMany();
  await Hero.deleteMany();

  //Will use this to store a list of all our teams
  const teamRecords = [];

  //Take the teams we have data for and use them to make records with out schema
  for (let teamItem of teamList) {
    //Make a Team from Schema
    const teamRecord = new Team(teamItem);
    //Add it to a list for connecting with heros
    teamRecords.push(teamRecord);
    //Save it to mongodb
    await teamRecord.save();
  }

  console.log("Done loading teams");

  //Process all the heroes from heroesList
  for (let i = 0; i < heroesList.length; i++) {
    //Make a Hero from Schema
    const heroRecord = new Hero(heroesList[i]);

    //Assign the first three to team[0], rest to team[1]
    if (i < 3) {
      heroRecord.team = teamRecords[0];
    } else {
      heroRecord.team = teamRecords[1];
    }

    //Save it to mongodb
    await heroRecord.save();
  }

  console.log("Done loading heroes");

  console.log("Done loading data");

  //Done with connection, close so program can exit
  mongoose.connection.close();
}

//Make it happen
loadAllRecords();
