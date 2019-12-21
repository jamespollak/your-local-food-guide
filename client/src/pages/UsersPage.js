import React, { Component } from "react";
import UserService from "../api/users";
import User from "../components/User";

export default class UsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.service = new UserService();
  }

  async componentDidMount() {
    const users = await this.service.getAllUsers();
    this.setState({ users });
  }

  render() {
    console.log(this.state);
    return (
      <div className="food-guides">
        <h1>Food Guides</h1>
        {this.state.users.map((user, i) => (
          <User key={i} {...user} />
        ))}
      </div>
    );
  }
}
