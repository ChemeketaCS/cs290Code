import { default as express } from "express";

//Construct a router object and export it
const router = express.Router();
export default router;

// handle / (within /user)
router.get("/", function (req, res, next) {
  res.send(`This is the users page.<br>
    Try <a href="ascholer">ascholer/</a>`);
});

// handle /XXX
router.get("/:name", (req, res) => {
  let userName = req.params.name; //:name automatically becomes this
  res.send(`You asked ${userName}'s directory.`);
});
