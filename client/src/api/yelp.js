import axios from "axios";

const YELP_API_KEY =
  "ETpD-WScgVpK-jsn29ZUxpHEVTM8mzHn3u2zISzVCzvuaBxK-Z5Qkfb7EjRllLLdXH0AJnbtpwQ0gqisdPTMrJtNf7vSKqr9jQxuGWzwmNlnjT6P15LpwKhVsFTiXXYx";

const api = axios.create({
  baseURL: `https://api.yelp.com/v3`,
  headers: {
    Authorization: `Bearer ${YELP_API_KEY}`
  }
});

const getRestaurants = userLocation => {
  return api
    .get("/businesses/search", {
      params: {
        limit: 10,
        categories: "restaurants",
        ...userLocation
      },
      crossDomain: true
    })
    .then(res => {
      res.data.businesses.map(business => {
        return {
          name: business.name,
          coords: business.coordinates
        };
      });
    })
    .catch(error => {
      console.error(error);
    });
};

export const getRestaurantsByQuery = (query, limit = 30) => {
  return api.get("http://localhost:3001/yelpProxy/restaurantsPerCity", {
    params: {
      location: query
    }
  });
};

export const getMyPlaces = id => {
  return axios.get("http://localhost:3001/yelpProxy/businesses/" + id);
};

// getMyPlaces("PG7ZC1CbMOflvOZ7Vj7bZQ")
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   });
//${"https://cors-anywhere.herokuapp.com/"}

export default {
  getRestaurants
};
