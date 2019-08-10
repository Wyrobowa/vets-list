import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  HashRouter,
  Link
} from 'react-router-dom';

import Home from '../containers/Home';
import Users from '../containers/Users';
import Vets from '../containers/Vets';
import Tags from '../containers/Tags';
import Header from './Header';
import Footer from './Footer';

const App = () => {
  return (
    <HashRouter>
      <Header/>
      <div className="container">
        <Route exact path="/admin" component={Home} />
        <Route exact path="/admin/users" component={Users} />
        <Route exact path="/admin/vets" component={Vets} />
        <Route exact path="/admin/tags" component={Tags} />
      </div>
      <Footer/>
    </HashRouter>
  );
};

export default App;