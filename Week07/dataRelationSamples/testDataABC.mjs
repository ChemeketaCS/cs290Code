//--------------------------------------------
//Connect to DB with Mongoose
import { default as credentials } from './dbCredentials.mjs';
import { default as mongoose } from 'mongoose';
mongoose.connect(credentials.connection_string);

//Load our models
import { default as A } from './models/A.mjs';
import { default as B } from './models/B.mjs';
import { default as C } from './models/C.mjs';

//Async function so we can use await to synchronize steps
async function testRecords() {

  //Demonstrate retrieving a C with associated data
  // Relations are just IDs
  let firstC = await C.findOne().exec();
  console.log("First C with no related data:\n", firstC);
  console.log("--------------------------------------------");

  //Could go retrieve related record with new query
  let firstCsFirstA = await A.findById(firstC.relatedAs[0]);
  console.log("First A related to that C:\n", firstCsFirstA);
  console.log("--------------------------------------------");

  //Demonstrate retrieving a C record with associated data
  // Relations are populated with actual data
  let firstCWithAs = await C.findOne().populate("relatedAs").exec();
  console.log("First C with A data:\n", firstCWithAs);
  console.log("--------------------------------------------");

  //Do deep population of B objects referenced by A's referenced from C
  let firstCWithAB = await C.findOne().populate({
    //get data for relatedAs
    path: 'relatedAs',
    //for each one, get data for relatedB
    populate: { path: 'relatedB' }
  }).exec();

  console.log("First C with A and B data:\n", firstCWithAB);
  console.log("--------------------------------------------");

  //Access name of a B record starting from a C:
  console.log("C zero's first A's B:", firstCWithAB.relatedAs[0].relatedB);

  //Done with connection, close so program can exit
  mongoose.disconnect();
}

//Make it happen
testRecords();
