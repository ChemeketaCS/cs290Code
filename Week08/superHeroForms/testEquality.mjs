//Test out accessing data

//Connect to DB with Mongoose
import { default as credentials } from "./dbCredentials.mjs";
import { default as mongoose } from "mongoose";
mongoose.connect(credentials.connection_string);

//Load our models
import { default as Team } from "./models/team.mjs";

async function testTeam() {
  //Get the first team, only get their _id
  let firstTeam = await Team.findOne().exec();
  console.log("\nFirstTeam:");
  console.log(firstTeam);

  //Get the first team, only get their _id
  let secondTeam = await Team.findOne().exec();
  console.log("\nSecond team:");
  console.log(secondTeam);

  console.log("firstTeam == secondTeam", firstTeam == secondTeam);
  console.log("firstTeam === secondTeam", firstTeam === secondTeam);
  console.log(
    "firstTeam._id === secondTeam._id",
    firstTeam._id === secondTeam._id
  );
  console.log(
    "firstTeam._id.equals(secondTeam._id)",
    firstTeam._id.equals(secondTeam._id)
  );
}

//Make it happen - close database connection when done
async function doAllTests() {
  console.log("Starting tests");
  await testTeam();
  mongoose.disconnect();
}

doAllTests();
