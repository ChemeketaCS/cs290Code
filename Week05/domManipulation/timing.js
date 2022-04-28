
//Wait to run until window is loaded
//This will work even if DOM is not fully loaded yet as it waits to run the
// inner code until the window has finished loading
window.addEventListener("load", function () {
  const dino2 = document.querySelector("img");
  dino2.addEventListener("click", function () {
    this.style.boxShadow = "black 10px 10px 5px";
  });
});

//Run as soon as file processed
//This will fail if the img tag has not been seen when this script is encountered
const dino = document.querySelector("img");
dino.addEventListener("click", function () {
  this.style.border = "5px solid blue";
});
