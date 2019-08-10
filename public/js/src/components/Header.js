import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/admin">Vets List - Admin Panel</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link className="nav-item nav-link" to="/admin/users">Users</Link>
          <Link className="nav-item nav-link" to="/admin/vets">Vets</Link>
          <Link className="nav-item nav-link" to="/admin/tags">Tags</Link>
          <Link className="nav-item nav-link" to="/admin/contact">Contact Info</Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
