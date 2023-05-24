//Module that exports some arrays of data to seed DB with
//This version stores relations outside of individual objects

let Alist = [
  {
    name: "A zero",
    //relatedB: //since this is a single reference, we won't even declare it
  },
  {
    name: "A one",
  },
  {
    name: "A two",
  },
];

let Blist = [
  {
    name: "B zero",
  },
  {
    name: "B one",
  },
  {
    name: "B two",
  },
];

let Clist = [
  {
    //C stores no relationship info
    name: "C zero",
    relatedAs: [], //an array of relations - at least start with an empty list
  },
  {
    name: "C one",
    relatedAs: [], //an array of relations - at least start with an empty list
  },
  {
    name: "C two",
    relatedAs: [], //an array of relations - at least start with an empty list
  },
];

//Desired initial relationships between A and B
//Relationship is Many(A) to One(B)
//Each item is a pair with [AIndex, BIndex]
let ABRelations = [
  [0, 0],
  [1, 0],
  [2, 1],
];

//Desired initial relationships between A and C
//Relationship is Many(A) to Many(C)
//Each item is a pair with [CIndex, [Array of AIndexes]]
let CARelations = [
  [0, [0, 1]],
  [2, [0, 1, 2]],
];

module.exports = { Alist, Blist, Clist, ABRelations, CARelations };
