import React from 'react';
import { Route } from 'react-router-dom';
import SessionFormContainer from './session_form/session_form_container';
import WordShowContainer from './word_show/word_show_container';
import WordSearchContainer from './word_search/word_search_container';
import Header from './header/header';
import Footer from './footer/footer';
import Splash from './splash/splash';
import ListsIndexContainer from './lists/lists_index_container';
import NewListContainer from './lists/new_list_container';
import ListShowContainer from './lists/list_show_container';
import { AuthRoute, ProtectedRoute,
         ProtectedExactRoute } from '../util/route_util';

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
      <ProtectedExactRoute path="/lookup"
                           component={WordSearchContainer}/>
      <ProtectedExactRoute exact path="/lists"
                           component={ListsIndexContainer} />
      <ProtectedRoute path="/lists/new" component={NewListContainer}/>
      <ProtectedRoute path="/lists/:id(\d+)" component={ListShowContainer}/>
    </main>
    <Footer/>
  </div>
);

export default App;
