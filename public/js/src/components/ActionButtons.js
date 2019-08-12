import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const ActionButtons = () => {
  return (
    <span>
      <Link to="/admin/user/:slug/edit" className="action-button"><i className="fas fa-edit"></i></Link>
      <Link to="/admin/user/:slug/delete" className="action-button"><i className="fas fa-trash"></i></Link>
    </span>
  );
}

export default ActionButtons;
