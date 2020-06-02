import React, { Component } from "react";
import {Link, NavLink} from 'react-router-dom';

class NavBar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">           
            <li className="nav-item">
              <NavLink to='/patient' className="nav-link">
                Patient
              </NavLink>
            </li>           
            <li className="nav-item">
              <NavLink to='/record' className="nav-link">
                Record
              </NavLink>
            </li>           
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
