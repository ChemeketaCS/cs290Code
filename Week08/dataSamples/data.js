//Module that exports some arrays of data to seed DB with
let Alist = [
  {
    name: "A zero",
    //relatedB: //since this is a single reference, we won't even declare it
    relatedCs: [], //an array of relations - at least start with an empty list
  },
  {
    name: "A one",
    relatedCs: [],
  },
  {
    name: "A two",
    relatedCs: [],
  },
];

let Blist = [
  {
    name: "B zero",
    relatedAs: [], //start with an empty array we can build up
  },
  {
    name: "B one",
    relatedAs: [],
  },
  {
    name: "B two",
    relatedAs: [],
  },
];

let Clist = [
  {
    //C stores no relationship info
    name: "C zero",
  },
  {
    name: "C one",
  },
  {
    name: "C two",
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

//Desired initial relationships between A and B
//Relationship is Many(A) to Many(C)
//Each item is a pair with [AIndex, [Array of CIndexes]]
let ACRelations = [
  [0, [0, 1]],
  [2, [0, 1, 2]],
];

module.exports = { Alist, Blist, Clist, ABRelations, ACRelations };
