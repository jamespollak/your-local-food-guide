import React, { Component } from "react";
import chefLogo from "../images/chef.png";
import { Link } from "react-router-dom";

//what is condition
// and how to make navbar aware of it.

class NavBar extends Component {
  render() {
    if (!this.props.user) {
      return (
        <nav>
          <img className="navItem" src={chefLogo} width="2%" alt="" />
          <Link className="navItem" to="/">
            Home
          </Link>
          <Link className="navItem" to="/users">
            Food Guides
          </Link>
          <Link className="navItem" to="/signup">
            Sign Up
          </Link>
          <Link className="navItem" to="/login">
            Login
          </Link>
        </nav>
      );
    } else {
      return (
        <nav>
          <img className="navItem" src={chefLogo} width="2%" alt="" />
          <Link className="navItem" to="/">
            Home
          </Link>
          <Link className="navItem" to="/users">
            Food Guides
          </Link>
          <Link className="navItem" to="/profile">
            {this.props.user.username}
          </Link>
          <Link className="navItem" onClick={this.props.logout} to="/">
            Logout
          </Link>
        </nav>
      );
    }
  }
}

export default NavBar;
