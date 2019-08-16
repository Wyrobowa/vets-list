import React, { useEffect, useState } from 'react';

import { withRouter } from "react-router";

const User = (props) => {
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
    fetch(`/api/admin/user/${props.match.params.id}/edit`)
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
      body: JSON.stringify({ data } )
     }).then(response => response.json());
  };

  return (
    <div className="user">
      <h1>User</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input className="form-control" type="text" name="first_name" onChange={handleChange} value={userData.user.first_name} />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input className="form-control" type="text" name="last_name" onChange={handleChange} value={userData.user.last_name} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input className="form-control" type="email" name="email" onChange={handleChange} value={userData.user.email} />
        </div>
        <div className="form-group">
          <label>User permissions</label>
          <select className="form-control" name="level">
            {(userData.levels) ? userData.levels.map(level => 
              <option key={level} className="text-uppercase" name={level} value={level} selected={(userData.user.level === level)}>{level}</option>
            ) : ''}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      
    </div>
  );
};

export default withRouter(User);
