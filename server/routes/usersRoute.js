const express = require("express");
const router = express.Router();
const User = require("../models/User");

/* GET users /api/users. */
router.get("/", async function(req, res, next) {
  console.log("hi");
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async function(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
