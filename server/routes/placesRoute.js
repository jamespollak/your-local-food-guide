var express = require("express");
var router = express.Router();
const User = require("../models/User");

/* POST places. */
router.post("/places", async (req, res, next) => {
  const { id } = req.body;
  console.log("testys", req.body);
  if (!id) {
    res.status(400).json({ message: "This ID does not exist" });
    return false;
  }
  try {
    const { _id } = req.session.user;
    const userUpdated = await User.findByIdAndUpdate(
      { _id },
      { $push: { places: id } },
      { new: true }
    );
    if (userUpdated) {
      req.session.user = userUpdated;
      res.status(200).json(userUpdated);
    } else {
      res.status(400).json({ message: "Please ensure you're logged in" });
    }
  } catch (err) {
    res.status(500).json({
      message: "Woops, something went wrong there! Please try again"
    });
  }
});

/* DELETE places. */
router.delete("/places", function(req, res, next) {
  //id to remove is in req.body.id

  res.status(200).json("hi");
});

/* GET places. */
router.get("/places", function(req, res, next) {
  //

  res.status(200).json("req.body.id");
});

module.exports = router;
