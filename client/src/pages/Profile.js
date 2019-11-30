import React, { Component, createRef } from "react";
import UploadService from "../api/uploadService";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null
    };
    this.form = createRef();
    this.uploadService = new UploadService();
  }

  submitHandler = async e => {
    e.preventDefault();
    try {
      const data = new FormData(this.form.current);
      const user = await this.uploadService.uploadProfile(data);
      this.props.setUserState(user);
      this.setState({ err: null });
    } catch (err) {
      debugger;
      let message = err.message;
      if (err.response) message = err.response.data.message;
      this.setState({ err: message });
    }
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Welcome {this.props.user.username}!</h1>
      </div>
    );
  }
}
