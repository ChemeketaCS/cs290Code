//--------------------------------------------
//Connect to DB with Mongoose
const credentials = require("./dbCredentials.js");
const mongoose = require("mongoose");
mongoose.connect(credentials.connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Load our models
const A = require("./models/A.js");
const B = require("./models/B.js");
const C = require("./models/C.js");

//Loads the data stored in this data file:
const dataFile = require("./data.js");

//Async function so we can use await to synchronize steps
async function loadAllRecords() {
  //Delete all existing records
  await A.deleteMany();
  await B.deleteMany();
  await C.deleteMany();

  //Make all the A objects and store into an array
  const ARecords = [];

  for (let item of dataFile.Alist) {
    //Make an object
    const aRecord = new A(item);
    //Add it to a list
    ARecords.push(aRecord);
    //Don't save yet...
  }

  console.log("Done loading As:");
  console.log(ARecords);

  //Same with B records
  const BRecords = [];
  for (let item of dataFile.Blist) {
    //Make an object and add to list
    BRecords.push(new B(item));
  }

  console.log("Done loading Bs:");
  console.log(BRecords);

  //Same with C records
  const CRecords = [];
  for (let item of dataFile.Clist) {
    CRecords.push(new C(item));
  }

  console.log("Done loading Cs:");
  console.log(CRecords);

  //Now let's wire up the connections between As and Bs
  for (let connection of dataFile.ABRelations) {
    //Connection looks like [0, 2] with indexes of A and B records to link
    //Get the two items
    let ARec = ARecords[connection[0]];
    let BRec = BRecords[connection[1]];

    ARec.relatedB = BRec._id; //relatedB is a single value in A
  }

  //Now let's wire up the connections between As and Cs
  for (let connection of dataFile.CARelations) {
    //Connection looks like [1, [0, 1]]. Get C record
    let Cindex = connection[0];
    let Alist = connection[1];
    let CRec = CRecords[Cindex];
    //Loop through all indexes for C
    for (let AIndex of Alist) {
      let ARec = ARecords[AIndex];
      //Relationship is normalized - only have to set on A side
      CRec.relatedAs.push(ARec._id);
    }
  }

  console.log("Done updating:");
  console.log("ARecords\n", ARecords);
  console.log("BRecords\n", BRecords);
  console.log("CRecords\n", CRecords);

  //Now we are ready to save everything. Make one giant list:
  let allRecords = ARecords.concat(BRecords).concat(CRecords);

  //Could loop through all records and call save on each and await results
  // one by one. But more efficient to save all and wait for all to be
  // finished.

  //Use map to tell each record to save itself and collect resulting promises
  let promises = allRecords.map((record) => record.save());

  //Now wait for all to finish
  await Promise.all(promises);

  //Demonstrate retrieving a C record with associated data
  let firstCWithAs = await C.findOne().populate("relatedAs").exec();
  console.log("First C with A data\n", firstCWithAs);

  //Do deep population of B objects referenced by A's referenced from C
  let firstCWithAB = await C.findOne().populate({
    //get data for relatedAs
    path: 'relatedAs',
    //for each one, get data for relatedB
    populate: { path: 'relatedB' }
  }).exec();
  
  console.log("First C with A and B data\n", firstCWithAB);
  //Access name of a B record starting from a C:
  console.log("C zero's first A's B:", firstCWithAB.relatedAs[0].relatedB.name);

  //Done with connection, close so program can exit
  mongoose.connection.close();
}

//Make it happen
loadAllRecords();
