//Module that exports some arrays of data to seed DB with
//This version stores relations outside of individual objects

let CourseList = [
  {
    name: "Course zero",
    //relatedInstructor: //since this is a single reference, we won't even declare it
  },
  {
    name: "Course one",
  },
  {
    name: "Course two",
  },
];

let InstructorList = [
  {
    name: "Instructor zero",
  },
  {
    name: "Instructor one",
  },
  {
    name: "Instructor two",
  },
];

let StudentList = [
  {
    name: "Student zero",
    relatedCourses: [], //an array of relations - at least start with an empty list
  },
  {
    name: "Student one",
    relatedCourses: [], //an array of relations - at least start with an empty list
  },
  {
    name: "Student two",
    relatedCourses: [], //an array of relations - at least start with an empty list
  },
];

//Desired initial relationships between A and B
//Relationship is Many(A) to One(B) and will be stored in A
//Store the indexes for desired connections from array above
let CourseInstructorRelations = [
  { CourseIndex: 0, InstructorIndex: 0 },
  { CourseIndex: 1, InstructorIndex: 0 },
  { CourseIndex: 2, InstructorIndex: 1 },
];

//Desired initial relationships between A and C
//Relationship is Many(A) to Many(C) and stored on C side
let StudentCourseRelations = [
  { StudentIndex: 0, CourseIndexes: [0, 1] },
  { StudentIndex: 2, CourseIndexes: [0, 1, 2] },
];

export default { CourseList, InstructorList, StudentList, CourseInstructorRelations, StudentCourseRelations };
