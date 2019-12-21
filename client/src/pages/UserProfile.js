import React, { Route, Component, createRef } from "react";
import UploadService from "../api/uploadService";
import Map from "../components/Map";
import UserBusiness from "../components/UserBusiness";
import { getMyPlaces } from "../api/yelp";
import AuthService from "../api/authService";
import UserService from "../api/users";
import chefLogo from "../images/chef.png";

export default class UserProfile extends Component {
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
    this.userService = new UserService();
  }

  async componentDidMount() {
    let user;
    const id = this.props.match.params.id;
    if (id) {
      user = await this.userService.getUser(id);
    } else {
      user = await this.service.isLoggedIn();
    }

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
    const places = this.state.places
      ? this.state.places.map(place => {
          return {
            coordinates: place.coordinates,
            name: place.name,
            image: place.image_url
          };
        })
      : [];
    console.log("IS loggedIN?", this.props.user);
    if (!this.state.user) return <img className="loadingchef" src={chefLogo} />;
    return (
      //   <div>
      //     <h1>{this.state.user.username}</h1>
      //     {this.state.places.map((id, i) => (
      //       <UserBusiness key={i} {...id} />
      //     ))}
      //   </div>
      <>
        <div className="profile">
          <div className="map">
            <Map places={places} mapView={this.state.mapView}></Map>
          </div>
          <div className="restaurants">
            <h1>{this.state.user.username}</h1>
            {this.state.places.map((id, i) => (
              <UserBusiness
                locationMapHandler={this.locationMapHandler}
                user={this.props.user}
                key={i}
                {...id}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}
