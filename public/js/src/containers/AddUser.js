import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router";

import BackButton from '../components/BackButton';
import Button from '../components/Button';
import Icon from '../components/Icon';

const AddUser = (props) => {
  const [userData, setUser] = useState({
    user: {
      first_name: '',
      last_name: '',
      email: '',
      level: '',
    },
    levels: [],
  });

  useEffect(() => {
    fetch('/api/admin/user/add')
      .then(response => response.json())
      .then((data) => {
        setUser(data);
      })
  }, []);

  const handleChange = (event) => {
    setUser({
      [event.target.name]: event.target.value
    })
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('/api/admin/user/:_id/edit', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userData } )
     }).then(response => response.json());
  };

  return (
    <div className="user">
      <h1>Add new user</h1>
      <BackButton link={props.history.goBack} />
      <form>
        <div className="form-group">
          <label>First Name</label>
          <input className="form-control" type="text" name="first_name" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input className="form-control" type="text" name="last_name" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input className="form-control" type="email" name="email" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>User permissions</label>
          <select className="form-control" name="level" onChange={handleChange}>
            {(userData.levels) ? userData.levels.map(level => 
              <option key={level} className="text-uppercase" name={level} >{level}</option>
            ) : ''}
          </select>
        </div>
        <Button buttonType="button" type="submit" size="normal" model="success" handleClick={handleSubmit}>
          <Icon type="add" />
          Add user
        </Button>
      </form>
      
    </div>
  );
};

export default withRouter(AddUser);
