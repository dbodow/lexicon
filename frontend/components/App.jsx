import React from 'react';
import { Route } from 'react-router-dom';
import SessionFormContainer from './session_form/session_form_container';
import Header from './header/header';
import { AuthRoute } from '../util/route_util';

const App = () => (
  <div>
    <Header/>
    <AuthRoute path="/login" component={SessionFormContainer} />
    <AuthRoute path="/signup" component={SessionFormContainer} />
  </div>
);

export default App;
