import React, { Route, Component, createRef } from "react";
import UploadService from "../api/uploadService";
import Map from "../components/Map";
import Business from "../components/Business";
import { getMyPlaces } from "../api/yelp";
import AuthService from "../api/authService";
import chefLogo from "../images/chef.png";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: [],
      user: null,
      mapView: {
        latitude: null,
        longitude: null
      }
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

  locationMapHandler = location => {
    this.setState({ mapView: location });
  };

  render() {
    console.log(this.state);
    const places = this.state.places
      ? this.state.places.map(place => {
          return {
            coordinates: place.coordinates,
            name: place.name,
            image: place.image_url
          };
        })
      : [];
    console.log(this.places);
    if (!this.state.user) return <img className="loadingchef" src={chefLogo} />;
    return (
      <div className="profile">
        <div className="map">
          {" "}
          <Map places={places} mapView={this.state.mapView}></Map>
        </div>
        <div className="restaurants">
          {" "}
          {this.state.places.map((place, i) => (
            <Business
              locationMapHandler={this.locationMapHandler}
              key={place.id}
              {...place}
              user={this.state.user}
              removePlace={this.removePlace}
            />
          ))}
        </div>
      </div>
    );
  }
}
