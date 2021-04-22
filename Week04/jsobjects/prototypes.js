console.log("---------------------------");
console.log("prototypes");
console.log("---------------------------");

function Person(first, last, age, gender) {
  // property and method definitions
  this.name = {
    first: first,
    last: last,
  };
  this.age = age;
  this.gender = gender;
  this.sayHi = function () {
    console.log(this.name.first + " says 'Hi'.");
  };
}

let personA = new Person("Bob", "Smith", 32, "male");
console.log(personA);

let personB = new Person("Dezi", "Jones", 31, "female");

//Define member function for all Persons
Person.prototype.getInitials = function () {
  return this.name.first[0] + this.name.last[0];
};

console.log(personA.getInitials());
console.log(personB.getInitials());

console.log("---------------------------");
//Add a new function to strings!
String.prototype.reverse = function () {
  let result = "";
  for (let i = this.length - 1; i >= 0; i--) {
    result += this[i];
  }
  return result;
};
let wow = "hello there";
console.log(wow.reverse());
console.log("---------------------------");

function Teacher(first, last, age, gender, subject) {
  Person.call(this, first, last, age, gender);

  this.subject = subject;
}
//let teacherA = new Teacher("Andrew", "Scholer", 47, "male");
//console.log(teacherA.getInitials());  //error - teacher doesn't inherity Person's prototype
//Copy Person's prototype into teacher's
Teacher.prototype = Object.create(Person.prototype);
//But set the correct constructor
Object.defineProperty(Teacher.prototype, "constructor", {
  value: Teacher,
  enumerable: false, // so that it does not appear in 'for in' loop
  writable: true,
});
//Now a Teacher has the prototype functions from Person
let teacherA = new Teacher("Andrew", "Scholer", 47, "male");
console.log(teacherA.getInitials());

//Inherits new functions
Person.prototype.greeting = function () {
  console.log("Hello from " + this.name.first);
};
personA.greeting();
teacherA.greeting();

//But parent class doesn't see ones added to child
Teacher.prototype.sayBye = function () {
  console.log("Bye from " + this.name.first);
};
//personA.sayBye();  //Person doesn't have sayBye()
teacherA.sayBye();
