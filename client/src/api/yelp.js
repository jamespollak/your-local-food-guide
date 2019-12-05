import axios from "axios";

const YELP_API_KEY =
  "ETpD-WScgVpK-jsn29ZUxpHEVTM8mzHn3u2zISzVCzvuaBxK-Z5Qkfb7EjRllLLdXH0AJnbtpwQ0gqisdPTMrJtNf7vSKqr9jQxuGWzwmNlnjT6P15LpwKhVsFTiXXYx";

const api = axios.create({
  baseURL: `${"https://cors-anywhere.herokuapp.com/"}https://api.yelp.com/v3`,
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
      }
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
  return api.get("/businesses/search", {
    params: {
      limit: limit,
      categories: "restaurants",
      location: query
    }
  });
};
// componentDidMount, get props.match.query.city

export default {
  getRestaurants
};
