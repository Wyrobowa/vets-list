import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  HashRouter,
  Link
} from 'react-router-dom';

import Home from '../containers/Home';
import Users from '../containers/Users';
import AddUser from '../containers/AddUser';
import EditUser from '../containers/EditUser';
import Vets from '../containers/Vets';
import Vet from '../containers/Vet';
import Tags from '../containers/Tags';
import AddTag from '../containers/AddTag';
import EditTag from '../containers/EditTag';
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
        <Route exact path="/admin/user/add" component={AddUser} />
        <Route exact path="/admin/user/:id/edit" component={EditUser} />
        <Route exact path="/admin/vets" component={Vets} />
        <Route exact path="/admin/vet/:slug/edit" component={Vet} />
        <Route exact path="/admin/tags" component={Tags} />
        <Route exact path="/admin/tag/add" component={AddTag} />
        <Route exact path="/admin/tag/:id/edit" component={EditTag} />
        <Route exact path="/admin/contact" component={Contact} />
      </div>
      <Footer/>
    </HashRouter>
  );
};

export default App;