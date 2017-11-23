import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

import { login, signup, logout } from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
  console.log('content loaded');
  const rootEl = document.getElementById('root');
  const store = configureStore();

  // Testing only
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.login = login;
  window.signup = signup;
  window.logout = logout;

  ReactDOM.render(<Root store={store}/>, rootEl);
});
