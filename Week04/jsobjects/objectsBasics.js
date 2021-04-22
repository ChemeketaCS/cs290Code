const person1 = {
  name: { first: "Anna", last: "Li" },
  age: 38,
  gender: "female",
  interests: ["programming", "mma"],
};

console.log(person1);
console.log(person1["age"]);
console.log(person1.age);
console.log(person1.interests[0]);
console.log(person1["interests"][0]);
console.log(person1.name.first);
console.log(person1["name"]["first"]);

console.log("Does person1 have a name? " + ("name" in person1));
console.log("Does person1 have a pet? " + ("pet" in person1));

person1.school = "Chemeketa";
person1["major"] = "CS";
delete person1.age;
console.log(person1);

for (let prop in person1) {
  console.log(prop + " = " + person1[prop]);
}

console.log("---------------------------");
console.log("Using as an associative array");
const items = ["Apple", "Banana", "Pear", "Apple", "Apple", "Orange", "Pear"];
const itemCounts = {};

for (let item of items) {
  //seen it before
  if (item in itemCounts) itemCounts[item]++;
  else itemCounts[item] = 1; //new
}
console.log(itemCounts);
for (let item in itemCounts) {
  console.log(`There are ${itemCounts[item]} ${item}(s)`);
}

console.log("---------------------------");
const person3 = {}; //empty object
person3.school = "Chemeketa";
//person3.name.first = "error";  //there is no name yet
person3.name = {}; //now it is an object
person3.name.first = "Jose";
person3.name.last = "Diaz";
console.log(person3);

const person2 = {
  name: { first: "Bob", last: "Smith" },
  age: 32,
  gender: "male",
  interests: ["music", "skiing"],
  greeting: function () {
    return "Hi! I'm " + this.name.first + ".";
  },
  ageBy: function (years) {
    //age += years; //does not work, must use this.age
    this.age += years;
  },
  bio: function () {
    return (
      this.name.first +
      " " +
      this.name.last +
      " is " +
      this.age +
      " years old. He likes " +
      this.interests[0] +
      " and " +
      this.interests[1] +
      "."
    );
  },
};

console.log(person2.greeting());

person2.initials = function () {
  return this.name.first[0].toUpperCase() + this.name.last[0].toUpperCase();
};

console.log(person2.initials());
