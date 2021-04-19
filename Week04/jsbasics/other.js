console.log("Hello there from the other included file");
console.log("x here is " + x);

console.log(add(1, 4));

function add(a, b) {
  let total = a + b;
  return total;
}
