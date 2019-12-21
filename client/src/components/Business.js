import React, { Component } from "react";
import addService from "../api/addService";
import removeService from "../api/removeService";
import { Link } from "react-router-dom";

class Business extends Component {
  constructor(props) {
    super(props);
    let btn = true;

    if (props.user) {
      btn = !props.user.places.includes(this.props.id);
    }
    this.state = {
      places: [],
      showBtn: btn
    };
    this.addService = new addService();
    this.removeService = new removeService();
  }
  addPlace = () => {
    this.addService
      .addBusiness(this.props.id)
      .then(result => {
        //update user.places
        this.setState({ showBtn: false });
      })
      .catch(error => {
        console.error(error);
      });
  };

  removePlace = () => {
    this.removeService
      .removeBusiness(this.props.id)
      .then(res => {
        //update the state of App.
        // this.setState({ places: res.places });
        //state.user.places array will be different
        this.setState({ showBtn: true });
        this.props.removePlace(this.props.id);
      })
      .catch(error => {
        console.error(error);
      });
  };

  /* 
    this.props.user.placesIds.includes(this.props.id) then do stuff
  */
  render() {
    if (!this.props.id) return null;
    return (
      <div className="business-layout">
        <h2 className="business-title">{this.props.name}</h2>
        <h4>
          {this.props.categories && this.props.categories[0].title} |{" "}
          {this.props.price} | {this.props.rating}
        </h4>
        <img className="business-image" src={this.props.image_url} alt="" />
        {!this.props.user && (
          <div>
            <button
              className="submit"
              type="submit"
              onClick="window.location.href = '/signup';"
            >
              Sign Up or Login | Add to your Food Guide
            </button>
          </div>
        )}
        {this.props.user && (
          <div>
            {this.state.showBtn && (
              <button
                className="submit-add"
                type="submit"
                onClick={() => this.addPlace()}
              >
                Add to my Food Guide
              </button>
            )}
            {!this.state.showBtn && (
              <button
                className="submit-remove"
                type="submit"
                onClick={() => this.removePlace()}
              >
                Remove from my Food Guide
              </button>
            )}
          </div>
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
