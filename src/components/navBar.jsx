import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light " style={{backgroundColor: '#23b7e5'}}>
        {/* <NavLink to="/" className="navbar-brand">
          Home
        </NavLink> */}
        <NavLink to="/patient" className="navbar-brand" style={{color: '#fff'}}>
          Patient
        </NavLink>
        <NavLink to="/record" className="navbar-brand" style={{color: '#fff'}}>
          Record
        </NavLink>
      </nav>
    );
  }
}

export default NavBar;
