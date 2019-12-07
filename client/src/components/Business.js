import React, { Component } from "react";
import addService from "../api/addService";

class Business extends Component {
  constructor() {
    super();
    this.state = {
      places: []
    };
    this.addService = new addService();
  }
  render() {
    console.log(this.props);
    return (
      <div className="business-layout">
        <h2>{this.props.name}</h2>
        <h4>
          {this.props.categories[0].title} | {this.props.price} |{" "}
          {this.props.rating}
        </h4>
        <img className="business-image" src={this.props.image_url} alt="" />
        <button
          className="submit"
          type="submit"
          onClick={() => this.addService.addBusiness(this.props.id)}
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
