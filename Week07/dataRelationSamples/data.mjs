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
//Relationship is Many(A) to One(B) and will be stored in A
//Store the indexes for desired connections from array above
let ABRelations = [
  { AIndex: 0, BIndex: 0 },
  { AIndex: 1, BIndex: 0 },
  { AIndex: 2, BIndex: 1 },
];

//Desired initial relationships between A and C
//Relationship is Many(A) to Many(C) and stored on C side
let CARelations = [
  { CIndex: 0, AIndexes: [0, 1] },
  { CIndex: 2, AIndexes: [0, 1, 2] },
];

export default { Alist, Blist, Clist, ABRelations, CARelations };
