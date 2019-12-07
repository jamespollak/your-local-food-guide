import React, { Route, Component, createRef } from "react";
import UploadService from "../api/uploadService";
import Map from "../components/Map";
import Business from "../components/Business";
import { getMyPlaces } from "../api/yelp";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: []
    };
  }

  componentDidMount() {
    getMyPlaces(this.props.user.places[0])
      .then(res => {
        this.setState({ places: res.id });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Welcome {this.props.user.username}</h1>
        {this.state.places.map((restaurant, i) => (
          <Business key={i} {...restaurant} />
        ))}
      </div>
    );
  }
}
