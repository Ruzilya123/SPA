
import React, { Component } from "react";
import { Link } from "react-router-dom";

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("token");
  }

  render() {
    return <Link to="/login" />;
  }
}

export default Logout;
