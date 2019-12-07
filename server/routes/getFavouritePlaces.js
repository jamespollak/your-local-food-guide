var express = require("express");
var router = express.Router();
const User = require("../models/User");
const axios = require("axios");

const YELP_API_KEY =
  "ETpD-WScgVpK-jsn29ZUxpHEVTM8mzHn3u2zISzVCzvuaBxK-Z5Qkfb7EjRllLLdXH0AJnbtpwQ0gqisdPTMrJtNf7vSKqr9jQxuGWzwmNlnjT6P15LpwKhVsFTiXXYx";

const api = axios.create({
  baseURL: `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3`,
  headers: {
    Authorization: `Bearer ${YELP_API_KEY}`
  }
});

/* get places. */
router.get("/", async (req, res, next) => {
  const { _id } = req.session.user;

  try {
    const user = await User.findById(_id);
    //user.places = [ yelpId's ]
    console.log(user);
    const allPlaces = user.places.map(async placeId => {
      try {
        const { data } = await api.get(`/places/${placeId}`);
        return data;
      } catch (err) {
        console.log(err);
        return err;
      }
    });
    console.log(allPlaces);
    res.status(200).json(allPlaces);
  } catch (err) {
    next(new Error(err));
  }
});

module.exports = router;
