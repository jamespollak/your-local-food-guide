import React, { Component } from "react";
import AuthService from "../api/authService";

export default class Signup extends Component {
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
      const user = await this.authService.signup(this.state);
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
      <div className="signup">
        <p>Want to join our global local food guide community? Sign up now!</p>
        <form onSubmit={this.submitHandler}>
          <input
            onChange={this.onChangeHandler}
            type="text"
            name="username"
            placeholder="Your username"
          />
          <input
            onChange={this.onChangeHandler}
            type="password"
            name="password"
            placeholder="Your password"
          />
          <input
            onChange={this.onChangeHandler}
            type="email"
            name="email"
            placeholder="Email address"
          />
          <button class="submit" type="submit">
            Sign Up
          </button>
        </form>
        {this.state.err && <p className="error">{this.state.err}</p>}
      </div>
    );
  }
}
