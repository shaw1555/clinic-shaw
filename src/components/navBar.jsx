import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <NavLink to="/" className="navbar-brand">
          Home
        </NavLink>
        <NavLink to="/patient" className="navbar-brand">
          Patient
        </NavLink>
        <NavLink to="/record" className="navbar-brand">
          Record
        </NavLink>
      </nav>
    );
  }
}

export default NavBar;
