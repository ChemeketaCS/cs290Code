onmessage = function (e) {
  //Same expensive work
  let myDate;
  for (let i = 0; i < 4000000; i++) {
    let date = new Date();
    myDate = date;
  }

  postMessage(e.data + " finished at " + myDate);
};
