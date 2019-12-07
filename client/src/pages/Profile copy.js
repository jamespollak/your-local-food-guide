import React, { Route, Component, createRef } from "react";
import UploadService from "../api/uploadService";
import Map from "../components/Map";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      err: null,
      places: []
    };
    this.form = createRef();
    this.uploadService = new UploadService();
  }

  //component did mount

  //function which takes yelp ID's and makes call to retrive info

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
        <h1>Welcome {this.props.user.username}</h1>
        {/* <Map /> */}
        {this.props.user.places.id}
      </div>
    );
  }
}
