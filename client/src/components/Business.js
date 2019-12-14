import React, { Component } from "react";
import addService from "../api/addService";
import removeService from "../api/removeService";

class Business extends Component {
  constructor() {
    super();
    this.state = {
      places: []
    };
    this.addService = new addService();
    this.removeService = new removeService();
  }
  addPlace = () => {
    this.addService
      .addBusiness(this.props.id)
      .then(result => {})
      .catch(error => {
        console.error(error);
      });
  };

  removePlace = () => {
    this.removeService
      .removeBusiness(this.props.id)
      .then(result => {})
      .catch(error => {
        console.error(error);
      });
  };

  /* 
    this.props.user.placesIds.includes(this.props.id) then do stuff
  */
  render() {
    let showDeleteBtn = false;

    if (this.props.user) {
      showDeleteBtn = this.props.user.places.includes(this.props.id);
    }

    if (!this.props.id) return null;
    return (
      <div className="business-layout">
        <h2>{this.props.name}</h2>
        <h4>
          {this.props.categories && this.props.categories[0].title} |{" "}
          {this.props.price} | {this.props.rating}
        </h4>
        <img className="business-image" src={this.props.image_url} alt="" />
        {!showDeleteBtn && (
          <button
            className="submit"
            type="submit"
            onClick={() => this.addPlace()}
          >
            Add to my food guide
          </button>
        )}
        {showDeleteBtn && (
          <button
            className="submit"
            type="submit"
            onClick={() => this.removePlace()}
          >
            Remove from my food guide
          </button>
        )}
      </div>
    );
  }
}

/*
  user might already added this to db.
  user.favourites = array of id's.


*/

export default Business;
