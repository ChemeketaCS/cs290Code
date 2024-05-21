//--------------------------------------------
//Connect to DB with Mongoose
import { default as credentials } from './dbCredentials.mjs';
import { default as mongoose } from 'mongoose';
mongoose.connect(credentials.connection_string);

//Load our models
import { default as Course } from './models/Course.mjs';
import { default as Instructor } from './models/Instructor.mjs';
import { default as Student } from './models/Student.mjs';

//Async function so we can use await to synchronize steps
async function testRecords() {

  //Demonstrate retrieving a Student with associated data
  // Relations are just IDs
  let firstStudent = await Student.findOne().exec();
  console.log("First Student with no related data:\n", firstStudent);
  console.log("--------------------------------------------");

  //Could go retrieve related record with new query
  let studentsCourse = await Course.findById(firstStudent.relatedCourses[0]);
  console.log("First Course taken by student:\n", studentsCourse);
  console.log("--------------------------------------------");

  //Demonstrate retrieving a Student record with associated data
  // Relations are populated with actual data
  let firstStudentPopulated = await Student.findOne().populate("relatedCourses").exec();
  console.log("First Student populated with Course data:\n", firstStudentPopulated);
  console.log("--------------------------------------------");

  //Do deep population of B objects referenced by A's referenced from C
  let firstStudentWithCourseInstructor = await Student.findOne().populate({
    //get data for relatedCourses
    path: 'relatedCourses',
    //for each one, get data for relatedInstructor
    populate: { path: 'relatedInstructor' }
  }).exec();

  console.log("First Student with 2-step populate:\n", firstStudentWithCourseInstructor);
  console.log("--------------------------------------------");

  //Access Instructor record starting from the Student:
  console.log(
    "Student zero's first course's instructor:",
    firstStudentWithCourseInstructor.relatedCourses[0].relatedInstructor
  );

  //Done with connection, close so program can exit
  mongoose.disconnect();
}

//Make it happen
testRecords();
