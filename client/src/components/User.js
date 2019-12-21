import React, { Component } from "react";
import addService from "../api/addService";
import removeService from "../api/removeService";
import { Link } from "react-router-dom";
import chefLogo from "../images/chef.png";

class User extends Component {
  constructor(props) {
    super(props);
    let btn = true;

    if (props.user) {
      btn = !props.user.includes(this.props.id);
    }
    this.state = {
      places: [],
      showBtn: btn
    };
    this.addService = new addService();
    this.removeService = new removeService();
  }
  addUser = () => {
    this.addService
      .addUsers(this.props.id)
      .then(result => {
        //update user.places
        this.setState({ showBtn: false });
      })
      .catch(error => {
        console.error(error);
      });
  };

  removeUser = () => {
    this.removeService
      .removeUsers(this.props.id)
      .then(res => {
        //update the state of App.
        // this.setState({ places: res.places });
        //state.user.places array will be different
        this.setState({ showBtn: true });
        this.props.removeUser(this.props.id);
      })
      .catch(error => {
        console.error(error);
      });
  };

  /* 
    this.props.user.placesIds.includes(this.props.id) then do stuff
  */
  render() {
    console.log(this.props);
    return (
      <div className="user-layout">
        <h1>{this.props.username}</h1>
        <img src={chefLogo} />
        <br></br>
        <Link className="userItem" to={`/user/${this.props._id}`}>
          View Profile
        </Link>
        {this.props.user && (
          <div>
            {this.state.showBtn && (
              <button
                className="submit"
                type="submit"
                onClick={() => this.addUser()}
              >
                Add to my Food Guides
              </button>
            )}
            {!this.state.showBtn && (
              <button
                className="submit"
                type="submit"
                onClick={() => this.removeUser()}
              >
                Remove from my Food Guides
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default User;
