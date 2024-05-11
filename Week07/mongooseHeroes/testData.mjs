//Test out accessing data

//Connect to DB with Mongoose
import { default as credentials } from './dbCredentials.mjs';
import { default as mongoose } from 'mongoose';
mongoose.connect(credentials.connection_string);

//Load our models
import { default as Hero } from './models/hero.mjs';
import { default as Team } from './models/team.mjs';

//Async function so we can use await to synchronize steps
async function testHero() {
  //Set up a query, do not execute yet...
  const heroQuery = Hero.findOne().where('name').eq('Molecule Man');
  //Execute and wait for response from DB
  const hero0 = await heroQuery.exec();

  //Create query and immediately exec
  const heroAlt = await Hero.findOne().where('name').eq('Molecule Man').exec();

  console.log('\nPrinting Molecule Man:');
  console.log(hero0);

  //Get info about hero0's team
  console.log('\nPrinting hero0\'s team info:');
  let squad = await Team.findById(hero0.team).exec();
  console.log(squad);

  //Find record where name matches a regex
  const hero1 = await Hero.findOne()
    .where('name')
    .regex(/eternal/i) //case 'i'nsensitive, look for eternal
    .select('name age') //only get name and age
    .exec(); //exec actually does find
  console.log('\nPrinting eternal flame:');
  console.log(hero1);

  console.log('\nAccessing virtual properties:');
  console.log(hero1.url);
  console.log(hero1.last_first);

  //Find all records with age less than 500
  const heroList1 = await Hero.find()
    .where('age')
    .lt(500)
    .limit(5) //at most 5 records
    .skip(0) //skip the first 0 records
    .sort('-age') //sort by age descending
    .exec();
  console.log('\nPrinting heroes under 500:');
  console.log(heroList1);

  //Find records AND automatically include all information from team
  const heroList2 = await Hero.find()
    .where('age')
    .lt(500)
    .populate('team') //Bring in all information about team
    //.populate('team', 'squadName') //Bring in just squadName from team
    .exec();
  console.log('\nPrinting heroes under 500 with their team:');
  console.log(heroList2);
}

async function testTeam() {
  //Get the first team, only get their _id
  let firstTeam = await Team.findOne().select('_id').exec();
  let firstTeamId = firstTeam._id;

  //If Id known, that is best way to find particular object
  let squad = await Team.findById(firstTeamId);
  console.log('\nThe squad:');
  console.log(squad);

  //Modify data
  if (squad.homeTown === 'Salem') squad.homeTown = 'Metro City';
  else squad.homeTown = 'Salem';
  //Data now changed in JS object, NOT in DB
  console.log('\nThe squad after changes:');
  console.log(squad);

  //Access url virtual
  console.log('\nThe squad URL:');
  console.log(squad.url);
  //Access members virtual - it is async, do make sure to wait for it
  console.log('\nThe squad members:');
  console.log(await squad.members);

  //Save changes to DB
  await squad.save();
}

//Make it happen - close database connection when done
async function doAllTests() {
  console.log('Starting tests');
  await testHero();
  await testTeam();
  mongoose.disconnect();
}

doAllTests();
