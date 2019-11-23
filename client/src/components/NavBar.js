import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      <nav>
        <a className="navItem" href="/">
          <img src="../public/chef.png" />
        </a>
        <a className="navItem" href="/">
          Home
        </a>
        <a className="navItem" href="/signup">
          Sign Up
        </a>
        <a className="navItem" href="/login">
          Login
        </a>
      </nav>
    );
  }
}

export default NavBar;
