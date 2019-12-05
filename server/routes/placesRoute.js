var express = require("express");
var router = express.Router();
const User = require("../models/User");
const Places = require("../models/Places");

/* POST places. */
router.post("/places", function(req, res, next) {
  console.log("Howdy");
  const { id } = req.body;
  if (!id) return next(new Error("No id"));
  const { _id } = req.session.user;

  //todo if current approach doesn't work.

  // the places array of objects that are straight up copies of yelp.
  User.findByIdAndUpdate(
    { _id },
    { $push: { places: id } },
    { new: true }
  ).then(updatedUser => {
    //here send udpdates user to front end.
    res.status(200).json(updatedUser);
  });
});

/* DELETE places. */
router.delete("/places", function(req, res, next) {
  res.render("places");
});

/* GET places. */
router.get("/places", function(req, res, next) {
  //

  res.render("places");
});

module.exports = router;
