var express = require("express");
const {
  GetRefreshToken,
  CreateEvent,
  UpdateEvent,
  ListEvents,
  DeleteEvent,
} = require("../controller");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/storerefreshtoken", async function (req, res, next) {
  const_token = await GetRefreshToken(req.body.code);
  //store the token in your database
  res.send("success");
});
router.post("/createanevent", async function (req, res) {
  let refreskToken = ""; //write a function that will return refresh token we stored
  let result = await CreateEvent(req.body, refreskToken);
  // this result will give you event id you can store it res.send(result)
  res.send(result);
});
router.post("/updateanevent", async function (req, res) {
  let refreskToken = ""; //write a function that will return refresh token we stored
  let result = await UpdateEvent(req.body, refreskToken);
  // this result will give you event id you can store it res.send(result)
  res.send(result);
});

router.post("/listanevent", async function (req, res) {
  let refreskToken = ""; //write a function that will return refresh token we stored
  let result = await ListEvents(req.body, refreskToken);
  // this result will give you event id you can store it res.send(result)
  res.send(result);
});

router.post("/deleteanevent", async function (req, res) {
  let refreskToken = ""; //write a function that will return refresh token we stored
  let result = await DeleteEvent(req.body, refreskToken);
  // this result will give you event id you can store it res.send(result)
  res.send(result);
});
module.exports = router;
