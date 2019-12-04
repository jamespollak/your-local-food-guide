import React, { Component } from "react";
import { getRestaurantsByQuery } from "../api/yelp";
import Business from "../components/Business";

export default class CityLandingPage extends Component {
  constructor() {
    super();
    this.state = {
      businesses: []
    };
  }

  componentDidMount() {
    getRestaurantsByQuery(this.props.match.params.query)
      .then(res => {
        this.setState({ businesses: res.data.businesses });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <h1>Discover {this.props.match.params.query}</h1>
        <h2>The restaurants</h2>
        {this.state.businesses.map((beer, i) => (
          <Business key={i} {...beer} />
        ))}
      </div>
    );
  }
}

// res.data.businesses.map(business => {
//   return {
//     name: business.name,
//     coords: business.coordinates
//   };
// });
