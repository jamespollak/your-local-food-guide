import React, { Component } from "react";
import addService from "../api/addService";

class Business extends Component {
  render() {
    return (
      <div className="business-layout">
        <h2>{this.props.name}</h2>
        <h4>
          {this.props.rating} | {this.props.price}
        </h4>
        <img className="business-image" src={this.props.image_url} alt="" />
        <button className="submit" type="submit">
          Add to my food guide
        </button>
      </div>
    );
  }
}

export default Business;
