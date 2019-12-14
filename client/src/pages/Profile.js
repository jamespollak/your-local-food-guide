import React, { Route, Component, createRef } from "react";
import UploadService from "../api/uploadService";
import Map from "../components/Map";
import Business from "../components/Business";
import { getMyPlaces } from "../api/yelp";
import AuthService from "../api/authService";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      user: null
    };
    this.service = new AuthService();
  }

  async componentDidMount() {
    const user = await this.service.isLoggedIn();

    const allPlaces = user.places.map(async placeId => {
      try {
        const { data } = await getMyPlaces(placeId);
        return data;
      } catch (err) {
        return null;
      }
    });
    Promise.all(allPlaces)
      .then(res => {
        console.log(res.filter(e => e));
        this.setState({ places: res.filter(e => e), user });
      })
      .catch(err => {
        console.log(err);
      });
  }

  removePlace = id => {
    //filter out id and set new state with new array;
    const places = this.state.places.filter(places => {
      return places.id !== id;
    });
    this.setState({ places });
  };

  render() {
    return (
      <div>
        <h1>Welcome {this.props.user.username}</h1>
        {this.state.places.map((id, i) => (
          <Business
            key={i}
            {...id}
            user={this.state.user}
            removePlace={this.removePlace}
          />
        ))}
      </div>
    );
  }
}
