console.log("Hello world");

let x = 40;
x++;
console.log(x);

console.log("\nYou called this with arguments:");
console.log("------------------------------------------------");
console.log(process.argv);
console.log("------------------------------------------------");

console.log("\nHere is your USERNAME:");
console.log("------------------------------------------------");
//Change to USER if using mac/linux
console.log(process.env.USERNAME);
console.log("------------------------------------------------");
