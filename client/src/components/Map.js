import React, { Component } from "react";
import ReactMapGL from "react-map-gl";

class Map extends Component {
  state = {
    viewport: {
      width: "50vw",
      height: "100vh",
      latitude: 51.5074,
      longitude: 0.1278,
      zoom: 1
    }
  };
  componentDidMount() {
    this.setUserLocation();
  }

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
      <div className="map">
        <ReactMapGL
          {...this.state.viewport}
          className="mapStyle"
          onViewportChange={viewport => this.setState({ viewport })}
        ></ReactMapGL>
      </div>
    );
  }
}

export default Map;
