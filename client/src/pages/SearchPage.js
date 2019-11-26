import React, { Component } from "react";
import AuthService from "../api/authService";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      err: null
    };
    this.authService = new AuthService();
  }

  onChangeHandler = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  submitHandler = async e => {
    e.preventDefault();
    try {
      const user = await this.authService.login(this.state);
      this.props.setUserState(user);
      this.props.history.push("/profile");
    } catch (err) {
      let message = err.message;
      if (err.response) message = err.response.data.message;
      this.setState({ err: message });
    }
  };

  render() {
    return (
        <div class="home-search">
        <h1>{{title}}</h1>
        <form class="search" action="/places" method="GET">
            <input type="text" placeholder="Search a city" name="city">
            <button type="submit">GO</button>
        </form>
        <p>Want to <a href="/signup">Signup?</a>
    </div>
    );
  }
}









