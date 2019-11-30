import React, { Component } from "react";
import ReactMapGL from "react-map-gl";

class Map extends Component {
  state = {
    viewport: {
      width: 1200,
      height: 400,
      latitude: 52.3667,
      longitude: 4.8945,
      zoom: 11,
      mapboxToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
    }
  };

  render() {
    return (
      <ReactMapGL
        className="mapStyle"
        {...this.state.viewport}
        onViewportChange={viewport => this.setState({ viewport })}
      />
    );
  }
}

export default Map;
