import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';

import { login, signup, logout } from './actions/session_actions';
import { fetchCurrentUserLists, fetchList, createList }
  from './util/list_api_util';

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root');
  let store;
  if (window.currentUser) {
    const preloadedState = { session: { currentUser: window.currentUser } };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }

  // Testing only
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.login = login;
  window.signup = signup;
  window.logout = logout;
  window.fetchCurrentUserLists = fetchCurrentUserLists;
  window.fetchList = fetchList;
  window.createList = createList;

  ReactDOM.render(<Root store={store}/>, rootEl);
});
