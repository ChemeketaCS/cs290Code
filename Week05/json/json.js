let superSquad = {
  squadName: "Super hero squad",
  homeTown: "Metro City",
  formed: 2016,
  secretBase: "Super tower",
  active: true,
  members: [
    {
      name: "Molecule Man",
      age: 29,
      secretIdentity: "Dan Jukes",
      powers: ["Radiation resistance", "Turning tiny", "Radiation blast"],
    },
    {
      name: "Madame Uppercut",
      age: 39,
      secretIdentity: "Jane Wilson",
      powers: [
        "Million tonne punch",
        "Damage resistance",
        "Superhuman reflexes",
      ],
    },
    {
      name: "Eternal Flame",
      age: 1000000,
      secretIdentity: "Unknown",
      powers: [
        "Immortality",
        "Heat Immunity",
        "Inferno",
        "Teleportation",
        "Interdimensional travel",
      ],
    },
  ],
};

//Turn it into a string
let squadString = JSON.stringify(superSquad);
console.log(squadString);
//console.log(squadString.squadName); //This no longer makes sense - it is just a string

//Turn the string back into an object
let parsedSquad = JSON.parse(squadString);
console.log(superSquad);
console.log(superSquad.squadName);

//------------------------------------------------------

let jsonArray = `[
  {
    "name": "Molecule Man",
    "age": 29,
    "secretIdentity": "Dan Jukes",
    "powers": [
      "Radiation resistance",
      "Turning tiny",
      "Radiation blast"
    ]
  },
  {
    "name": "Madame Uppercut",
    "age": 39,
    "secretIdentity": "Jane Wilson",
    "powers": [
      "Million tonne punch",
      "Damage resistance",
      "Superhuman reflexes"
    ]
  }
]`;

let parsedArray = JSON.parse(jsonArray);
console.log(parsedArray);
console.log(parsedArray[0]);

let foo = {
  a: 1,
  b: (x) => 2 * x,
  c: new Date(),
};

let parsedArray2 = JSON.stringify(foo);
console.log(parsedArray2);
