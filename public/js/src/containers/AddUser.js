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
      .then(data => {
        setUser({ levels: data.levels });
      });
  }, []);

  const handleChange = (event) => {
    setUser({
      user: {
        ...userData.user,
        [event.target.name]: event.target.value,
      },
      levels: userData.levels,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('/api/admin/user/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userData })
     })
     .then(response => response.json())
     .then((data) => {
      if (data.status === 'success') {
        props.history.push({
         pathname: '/admin/users',
         state: data,
       });
      }
     });
  };

  return (
    <div className="user-container">
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
              <option key={level} className="text-uppercase" name={level} value={level} onChange={handleChange}>{level}</option>
            ) : ''}
          </select>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input className="form-control" type="password" name="password" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Confirm password</label>
          <input className="form-control" type="password" name="password_confirmation" onChange={handleChange} />
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
