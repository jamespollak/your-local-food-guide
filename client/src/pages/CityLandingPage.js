import React, { Component } from "react";
import { getRestaurantsByQuery } from "../api/yelp";
import Business from "../components/Business";
import AuthService from "../api/authService";
import chefLogo from "../images/chef.png";

export default class CityLandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      amount: 50,
      user: null
    };
    this.service = new AuthService();
  }

  async componentDidMount() {
    let user;
    try {
      user = await this.service.isLoggedIn();
    } catch (err) {
      user = null;
    }

    getRestaurantsByQuery(this.props.match.params.query, this.state.amount)
      .then(res => {
        this.setState({ businesses: res.data.businesses, user });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    console.log(this.props.user);
    if (!this.state.user) return <img className="loadingchef" src={chefLogo} />;
    return (
      <div>
        <h1>Discover {this.props.match.params.query}</h1>
        {this.state.businesses.map((restaurant, i) => (
          <Business key={i} {...restaurant} user={this.state.user} />
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

{
  /* 
        <div action="">
          <h2>How many restaurants do you wanna see?</h2>
          <input
            type="text"
            value={this.state.amountOfBussinesses}
            name="amount"
            onChange={e => this.setState({ [e.target.name]: e.target.value })}
          />
        </div> */
}
