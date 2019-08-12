
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const AddButton = () => {
  return (
    <span className="add-button">
      <Link to="/admin/users/edit" className="btn btn-success add-button float-right"><i className="fas fa-plus"></i></Link>
    </span>
  );
}

export default AddButton;
