import React from 'react';
import { Link } from 'react-router-dom';

const loggedOutGreeting = () => (
  <nav className="logged-out-greeting">
    <Link className="session-link" to='/login'>Log In</Link>
    <Link className="signup-link" to='/signup'>Sign Up</Link>
  </nav>
);

const loggedInGreeting = (currentUser, logout) => (
  <nav className='logged-in-greeting'>
    <h3 className='user-name'>Welcome, {currentUser.username}</h3>
    <button className='logout-button' onClick={logout}>Log Out</button>
  </nav>
);

const Greeting = ({currentUser, logout}) => (
  currentUser? loggedInGreeting(currentUser, logout) : loggedOutGreeting()
);

export default Greeting;
