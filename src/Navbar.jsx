import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/" exact={true} className="nav-link" activeClassName="active">Feed</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/channels" className="nav-link" activeClassName="active">Channels</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;