import React from 'react';
import GreetingContainer from '../greeting/greeting_container';
import { NavLink } from 'react-router-dom';

export default () => (
  <header className="header-container">
    <h1 className="logo-text">Lexicon</h1>
    <div className="header-links">
      <NavLink to="/quiz">Quiz</NavLink>
      <NavLink to="/lookup">Look Up</NavLink>
      <NavLink to="/lists">Lists</NavLink>
    </div>
    <GreetingContainer className="greeting-container" />
  </header>
);
