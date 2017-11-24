import React from 'react';
import GreetingContainer from '../greeting/greeting_container';
import { NavLink, Link } from 'react-router-dom';

export default () => (
  <header className="header-container">
    <div className="fixed-width header-content">
      <Link className="logo-text" to="/">
        Lexicon.
      </Link>
      <nav className="header-links">
        <NavLink className="nav-link" to="/quiz">
          <i class="fa fa-gamepad" aria-hidden="true"></i>
          QUIZ
        </NavLink>
        <NavLink className="nav-link" to="/lookup">
          <i class="fa fa-search" aria-hidden="true"></i>
          LOOK UP
        </NavLink>
        <NavLink className="nav-link" to="/lists">
          <i class="fa fa-list" aria-hidden="true"></i>
          LISTS
        </NavLink>
      </nav>
      <GreetingContainer className="greeting-container" />
    </div>
  </header>
);
