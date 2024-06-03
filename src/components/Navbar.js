/**
 * @file Navbar.js
 * @dev Navbar component that displays the application brand and user's account address.
 */

import React, { Component } from 'react';
import investment from '../investment.png';

class Navbar extends Component {

  /**
   * @dev Renders the Navbar component.
   * Displays the application brand and user's account address.
   */
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-darkbrown p-3 shadow custom-navbar-height">
        <a className="navbar-brand" href="#">
          <img src={investment} width="40" height="40" className="d-inline-block align-top" alt="" />
          &nbsp; OMNIK Token Farm
        </a>
        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav">
            <li className="nav-item">
              <span className="navbar-text text-beige">
                <small id="account">{this.props.account}</small>
              </span>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
