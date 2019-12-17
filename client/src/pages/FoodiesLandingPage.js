import React, { Component } from "react";
import { getRestaurantsByQuery } from "../api/yelp";
import Business from "../components/Business";

export default class CityLandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      amount: 50
    };
  }

  componentDidMount() {
    getRestaurantsByQuery(this.props.match.params.query, this.state.amount)
      .then(res => {
        this.setState({ businesses: res.data.businesses });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    console.log(this.props.user);
    return (
      <div>
        <h1>Discover {this.props.match.params.query}</h1>
        {this.state.businesses.map((restaurant, i) => (
          <Business key={i} {...restaurant} user={this.props.user} />
        ))}
      </div>
    );
  }
}
