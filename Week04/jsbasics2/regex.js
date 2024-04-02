console.log("-----------------------------");
console.log("Regexes");
console.log("-----------------------------");
let re = /\d{3}[-\s.]\d{4}/;
console.log(re.test("503.123.2345"));
console.log(re.test("123 123-2345 "));
console.log(re.test("123 2345"));
console.log(re.test("123 abc"));

let phonePattern = /(\d{3})[-\s.](\d{4})/;
let matches = "503.123.2345 503-352-4317".match(phonePattern);
console.log(matches);
console.log(matches[0]);

let phonePatternGlobal = /(\d{3})[-\s.](\d{4})/g;
let matches2 = "503.123.2345 503-352-4317".match(phonePatternGlobal);
console.log(matches2);

const paragraph = "The quick brown fox jumps over the lazy dog. It barked.";
const regex = /[A-Z]/g;
const found = paragraph.match(regex);
console.log(found);
