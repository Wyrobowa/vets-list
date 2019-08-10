import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const ActionButtons = () => {
  return (
    <span>
      <Link to="#" className="btn btn-small btn-info action-button">Edit</Link>
      <Link to="#" className="btn btn-small btn-danger action-button">Delete</Link>
    </span>
  );
}

export default ActionButtons;
