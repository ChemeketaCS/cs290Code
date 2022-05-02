//Filessystem provides async and synchronous modes
const fs = require("fs");

//Use asynch callback to open file and read it
fs.readFile("./data.txt", (error, data) => {
  if (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  } else {
    console.log(data.toString());
  }
});

//Use synchronous code to open current directory and list files
let curDir = fs.opendirSync("./");
console.log(curDir);
console.log(curDir.readSync());
let entry;
while ((entry = curDir.readSync())) {
  console.log(entry);
}
curDir.closeSync();
