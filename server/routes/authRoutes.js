const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 1; // cost factor for producing the hash

router.post("/signup", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "Please provide your credentials" });
    return false;
  }

  try {
    //encrpt password
    const user = await User.create(req.body);
    // dont send password back
    req.session.user = user;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({
      message: "Woops, something went wrong there! Please try again"
    });
  }
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ message: "Please provide your credentials" });
    return false;
  }

  try {
    const user = await User.findOne({ username });
    if (user && user.password === password) {
      req.session.user = user;
      res.status(200).json(user);
    } else {
      res
        .status(400)
        .json({ message: "Please provide the correct credentials" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Woops, something went wrong there! Please try again" });
  }
});

router.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.status(200).json({ message: "You are now logged out" });
});

router.get("/isLoggedIn", (req, res, next) => {
  console.log(req.session);
  if (req.session.user) {
    res.status(200).json(req.session.user);
  } else {
    res.status(401).json({ message: "Get outta here" });
  }
});

module.exports = router;
