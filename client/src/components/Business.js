import React, { Component } from "react";
import addService from "../api/addService";

class Business extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="business-layout">
        <h2>{this.props.name}</h2>
        <h4>
          {this.props.rating} | {this.props.price}
        </h4>
        <img className="business-image" src={this.props.image_url} alt="" />
        <button
          className="submit"
          type="submit"
          onClick={() => addService(this.props.id)}
        >
          Add to my food guide
        </button>
      </div>
    );
  }
}

/*
  user might already added this to db.
  user.favourites = array of id's.


*/

export default Business;
