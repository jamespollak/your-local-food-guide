import React, { Component } from "react";
import "./App.css";
import AuthService from "./api/authService";
import { Switch, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Loader from "./components/Loader";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import YelpService from "./api/yelp";
import HigherOrder from "./pages/HigherOrder";
import HomePage from "./pages/HomePage";
import CityLandingPage from "./pages/CityLandingPage";
import UsersPage from "./pages/UsersPage";
import UserProfile from "./pages/UserProfile";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      isLoadingUser: true,
      region: null,
      restaurants: []
    };
    this.authService = new AuthService();
  }

  getUserLocation = async () => {
    let location;
    await navigator.geolocation.getCurrentPosition(async result => {
      location = {
        latitude: result.coords.latitude,
        longitude: result.coords.longitude
      };
      const restaurants = await YelpService.getRestaurants(location);
    });
  };

  getRestaurants = async () => {
    const { latitude, longitude } = this.state.region;
    const userLocation = { latitude, longitude };
    const restaurants = await YelpService.getRestaurants(userLocation);
    this.setState({ restaurants });
  };

  //Every time starts check if user session exists and retrieve user data.
  async componentDidMount() {
    let user;
    let location;

    try {
      //Making the actual API call.
      user = await this.authService.isLoggedIn();
      this.getUserLocation();
    } catch (err) {
      user = null;
    } finally {
      //Irregardless of the result we want to set state.
      this.setUserState(user, location);
    }
  }

  setUserState = (user, location) => {
    // If user is loggedIn state will be set with user,
    // otherwise user will be null.
    const setLocation = this.state.location ? this.state.location : location;

    this.setState({ user, setLocation, isLoadingUser: false, err: null });
  };

  logout = async () => {
    //destroy session.
    try {
      await this.authService.logout();
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ user: null });
    }
  };

  render() {
    const { region, restaurants } = this.state;
    console.log("STATE", this.state.user);
    // Initially we do not know yet whether an user is logged in or not so we just return a loader.
    if (this.state.isLoadingUser)
      return <Loader className="full-screen-loader" />;
    return (
      <div className="App">
        <NavBar user={this.state.user} logout={this.logout} />
        <main>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/users" component={UsersPage} />
            <Route
              exact
              path="/user/:id"
              render={props => (
                <UserProfile {...props} user={this.state.user} />
              )}
            />
            <Route
              exact
              path="/city/:query"
              render={props => (
                <CityLandingPage {...props} user={this.state.user} />
              )}
            />

            <Route
              path="/login"
              render={props => (
                <Login {...props} setUserState={this.setUserState} />
              )}
            />
            <Route
              path="/signup"
              render={props => (
                <Signup {...props} setUserState={this.setUserState} />
              )}
            />
            <PrivateRoute
              path="/profile"
              user={this.state.user}
              setUserState={this.setUserState}
              component={Profile}
            />
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}
