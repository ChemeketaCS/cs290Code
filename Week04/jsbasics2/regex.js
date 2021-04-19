console.log("-----------------------------");
console.log("Regexes");
console.log("-----------------------------");
let re = /\d{3}[\s.-]\d{4}/g;

console.log(re.test("503.123.2345"));

let matches = "503.123.2345 503-352-4317".match(re);
console.log(matches);

const paragraph = "The quick brown fox jumps over the lazy dog. It barked.";
const regex = /[A-Z]/g;
const found = paragraph.match(regex);
console.log(found);
