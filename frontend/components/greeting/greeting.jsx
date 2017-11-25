import React from 'react';
import { Link } from 'react-router-dom';

const loggedOutGreeting = () => (
  <nav className="logged-out-greeting">
    <Link className="session-link" to='/login'>Log In</Link>
    <Link className="signup-link" to='/signup'>Sign Up</Link>
  </nav>
);

const renderIcon = user => {
  if (user.points === 0) {
    return <i class="fa fa-child fa-2x" aria-hidden="true"></i>;
  } else if (user.points < 1000) {
    return <i class="fa fa-leaf fa-2x" aria-hidden="true"></i>;
  } else if (user.points < 2000) {
    return <i class="fa fa-fire fa-2x" aria-hidden="true"></i>;
  } else {
    return <i class="fa fa-bolt fa-2x" aria-hidden="true"></i>;
  }
};

const loggedInGreeting = (currentUser, logout) => (
  <nav className='logged-in-greeting'>
    <div className='user-data'>
      <h3 className='user-points'>{currentUser.points.toLocaleString()}</h3>
      <h3 className='user-name'>{currentUser.username}</h3>
    </div>
    {renderIcon(currentUser)}
    <button className='logout-button' onClick={logout}>Log Out</button>
  </nav>
);

const Greeting = ({currentUser, logout}) => (
  currentUser? loggedInGreeting(currentUser, logout) : loggedOutGreeting()
);

export default Greeting;
