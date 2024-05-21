//--------------------------------------------
//Connect to DB with Mongoose
import { default as credentials } from './dbCredentials.mjs';
import { default as mongoose } from 'mongoose';
mongoose.connect(credentials.connection_string);

//Load our models
import { default as Course } from './models/Course.mjs';
import { default as Instructor } from './models/Instructor.mjs';
import { default as Student } from './models/Student.mjs';

//Loads the data stored in this data file:
import { default as dataFile } from './data.mjs';

//Async function so we can use await to synchronize steps
async function loadAllRecords() {
  //Delete all existing records
  await Course.deleteMany();
  await Instructor.deleteMany();
  await Student.deleteMany();

  //Make all the A objects and store into an array
  const CourseRecords = [];

  //For each course record in the data file
  for (let item of dataFile.CourseList) {
    //Make an object
    const record = new Course(item);
    //Add it to a list
    CourseRecords.push(record);
    //Don't save yet...
  }

  console.log("Done loading Courses:");
  console.log(CourseRecords);

  //Same with instructor records
  const InstructorRecords = [];
  for (let item of dataFile.InstructorList) {
    //Make an object and add to list
    InstructorRecords.push(new Instructor(item));
  }

  console.log("Done loading Instructors:");
  console.log(InstructorRecords);

  //Same with C records
  const StudentRecords = [];
  for (let item of dataFile.StudentList) {
    StudentRecords.push(new Student(item));
  }

  console.log("Done loading Studentss:");
  console.log(StudentRecords);

  //Now let's wire up the connections between Courses and Instructors
  for (let connection of dataFile.CourseInstructorRelations) {
    //Get the two items using the index
    let courseRec = CourseRecords[connection.CourseIndex];
    let instructorRec = InstructorRecords[connection.InstructorIndex];

    courseRec.relatedInstructor = instructorRec._id; 
    //relatedInstructor is a single value in Course
  }

  //Now let's wire up the connections between Students and Courses
  for (let connection of dataFile.StudentCourseRelations) {
    let studentRec = StudentRecords[connection.StudentIndex];
    //Loop through all related indexes
    for (let courseIndex of connection.CourseIndexes) {
      let courseRecord = CourseRecords[courseIndex];
      //add course to student
      studentRec.relatedCourses.push(courseRecord._id);
    }
  }

  console.log("Done connecting records:");
  console.log("CourseRecords\n", CourseRecords);
  console.log("InstructorRecords\n", InstructorRecords);
  console.log("StudentRecords\n", StudentRecords);

  //Now we are ready to save everything. Make one giant list:
  let allRecords = CourseRecords.concat(InstructorRecords).concat(StudentRecords);

  //We could loop through all records and call save on each and await results
  // one by one. But it is more efficient to start up all the saves in
  // parallel and then wait for all to finish.
  //Use map to tell each record to save itself and collect resulting promises
  let promises = allRecords.map((record) => record.save());

  //Now wait for all to finish
  await Promise.all(promises);

  mongoose.disconnect();
}

//Make it happen
loadAllRecords();
