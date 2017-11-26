import React from 'react';
import { Route } from 'react-router-dom';
import SessionFormContainer from './session_form/session_form_container';
import WordShowContainer from './word_show/word_show_container';
import Header from './header/header';
import Footer from './footer/footer';
import Splash from './splash/splash';
import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div>
    <Header/>
    <main className='main-content-container'>
      <div className='header-spacer'>&nbsp;</div>
      <Route exact path="/" component={Splash} />
      <AuthRoute path="/login" component={SessionFormContainer} />
      <AuthRoute path="/signup" component={SessionFormContainer} />
      <ProtectedRoute path="/lookup/:word"
                      component={WordShowContainer}/>
    </main>
    <Footer/>
  </div>
);

export default App;
