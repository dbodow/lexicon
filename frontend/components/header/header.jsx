import React from 'react';
import GreetingContainer from '../greeting/greeting_container';
import { NavLink, Link } from 'react-router-dom';

export default () => (
  <header className="header-container">
    <div className="header-content fixed-width">
      <nav className="logo-container">
        <Link className="logo-text" to="/">
          Lexicon.
        </Link>
      </nav>
      <nav className="header-links inner-fixed-width">
        <NavLink className="nav-link" to="/quiz">
          <i className="fa fa-gamepad" aria-hidden="true"></i>
          QUIZ
        </NavLink>
        <NavLink className="nav-link" to="/lookup">
          <i className="fa fa-search" aria-hidden="true"></i>
          LOOK UP
        </NavLink>
        <NavLink className="nav-link" to="/lists">
          <i className="fa fa-list" aria-hidden="true"></i>
          LISTS
        </NavLink>
      </nav>
      <GreetingContainer className="greeting-container" />
    </div>
  </header>
);
