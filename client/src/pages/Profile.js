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

  async componentDidMount() {
    const allPlaces = this.props.user.places.map(async placeId => {
      try {
        const { data } = await getMyPlaces(placeId);
        return data;
      } catch (err) {
        return null;
      }
    });
    Promise.all(allPlaces)
      .then(res => {
        console.log(res);
        debugger;

        debugger;
        this.setState({ places: res });

        debugger;
      })
      .catch(err => {
        console.log(err);
        debugger;
      });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>Welcome {this.props.user.username}</h1>
        {this.state.places.map((id, i) => (
          <Business key={i} {...id} />
        ))}
      </div>
    );
  }
}
