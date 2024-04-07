//Takes a string like:
//Team validation failed: squadName: You must provide a Team Name, homeTown: You must provide a Hometown
//and extracts the list of error messages into an array like:
//["You must provide a Team Name","You must provide a Hometown"]
function errorParser(errorString) {
  errorString = errorString.slice(errorString.indexOf(":") + 1);
  let errorArray = errorString.split(",");
  for (let i = 0; i < errorArray.length; i++) {
    let e = errorArray[i];
    errorArray[i] = e.slice(e.indexOf(":") + 1).trim();
  }
  return errorArray;
}

export { errorParser };
