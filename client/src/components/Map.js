import React, { Component } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import chefLogo from "../images/chef.png";

class Map extends Component {
  constructor(props) {
    super(props);

    let latitude = 51.5074;
    let longitude = 0.1278;
    if (props.places.length > 0) {
      latitude = props.places[0].coordinates.latitude;
      longitude = props.places[0].coordinates.longitude;

      console.log(latitude, longitude);
    }

    this.state = {
      viewport: {
        width: "50vw",
        height: "100vh",
        latitude: latitude,
        longitude: longitude,
        zoom: 11
      }
    };
  }

  renderMarkers = () => {
    return this.props.places.map(location => {
      return (
        <Marker
          style={{
            position: "absolute",
            background: "#fff",
            left: 10,
            top: 10
          }}
          latitude={location.coordinates.latitude}
          longitude={location.coordinates.longitude}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <p>{location.name}</p>
          {<img className="chef-map" src={chefLogo} />}
        </Marker>
      );
    });
  };

  setUserLocation = () => {
    navigator.geolocation.getCurrentPosition(position => {
      let newViewport = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 13
      };
      this.setState({
        viewport: { ...this.state.viewport, ...newViewport }
      });
    });
  };

  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        className="mapStyle"
        onViewportChange={viewport => this.setState({ viewport })}
      >
        {this.renderMarkers()}
      </ReactMapGL>
    );
  }
}

export default Map;
