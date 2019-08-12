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
import Contact from '../containers/Contact';
import Header from './Header';
import Footer from './Footer';

const App = () => {
  return (
    <HashRouter>
      <Header/>
      <div className="container-fluid">
        <Route exact path="/admin" component={Home} />
        <Route exact path="/admin/users" component={Users} />
        <Route exact path="/admin/vets" component={Vets} />
        <Route exact path="/admin/tags" component={Tags} />
        <Route exact path="/admin/contact" component={Contact} />
      </div>
      <Footer/>
    </HashRouter>
  );
};

export default App;