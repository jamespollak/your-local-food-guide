import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_YELP_URL,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`
  }
});

const yelpProxy = axios.create({
  baseURL: process.env.REACT_APP_PROXY_URL
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
  return yelpProxy.get("restaurantsPerCity", {
    params: {
      location: query
    }
  });
};

export const getMyPlaces = id => {
  return yelpProxy.get("businesses/" + id);
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
