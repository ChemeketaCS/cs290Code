var express = require("express");
const session = require("express-session");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log("Session info is: ", req.session);
  let todoList = [];
  //If we have one in the session, use that instead
  if (req.session.todoList) todoList = req.session.todoList;
  res.render("index", { todos: todoList });
});

router.post("/", function (req, res, next) {
  let newItem = req.body.todo;
  //In no info in session, make an empty list
  if (!req.session.todoList) {
    req.session.todoList = [];
  }
  //Add new item to list we know exists
  req.session.todoList.push(newItem);
  console.log("Session info is: ", req.session);
  //Pass on to view for rendering
  res.render("index", { todos: req.session.todoList });
});

module.exports = router;
