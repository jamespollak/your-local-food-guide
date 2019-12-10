const express = require("express");
const router = express.Router();
const request = require("request");
const YELP_API_KEY = `ETpD-WScgVpK-jsn29ZUxpHEVTM8mzHn3u2zISzVCzvuaBxK-Z5Qkfb7EjRllLLdXH0AJnbtpwQ0gqisdPTMrJtNf7vSKqr9jQxuGWzwmNlnjT6P15LpwKhVsFTiXXYx`;

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

router.get("/restaurantsPerCity", (req, res) => {
  request(
    {
      url: `https://api.yelp.com/v3/businesses/search?limit=50&categories=restaurants&location=${req.query.location}`,
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`
      }
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: error });
      }
      res.json(JSON.parse(body));
    }
  );
});
module.exports = router;

router.get("/businesses/:path", (req, res) => {
  request(
    {
      url: `https://api.yelp.com/v3/businesses/${req.params.path}`,
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`
      }
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: error });
      }
      res.json(JSON.parse(body));
    }
  );
});
