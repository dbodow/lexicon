import React from 'react';
import { Route } from 'react-router-dom';
import SessionFormContainer from './session_form/session_form_container';
import Header from './header/header';
import Footer from './footer/footer';
import Splash from './splash/splash';
import { AuthRoute } from '../util/route_util';

const App = () => (
  <div>
    <Header/>
    <main className='main-content-container'>
      <div className='header-spacer'>&nbsp;</div>
      <AuthRoute path="/login" component={SessionFormContainer} />
      <AuthRoute path="/signup" component={SessionFormContainer} />
      <Route exact path="/" component={Splash} />
    </main>
    <Footer/>
  </div>
);

export default App;
