import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router";

import Flash from '../components/FlashMessages';
import Button from '../components/Button';
import Icon from '../components/Icon';

const Users = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/admin/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div className="users">
      {props.location.state
        && <Flash flash={props.location.state} />
      }
      <div className="title">
        <h1>Users List</h1>
        <Button buttonType="link" model="info" link='user/add'>
          <Icon type="add" />
          Add new user
        </Button>
      </div>
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">E-mail</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.last_name}</td>
              <td>{user.first_name}</td>
              <td>{user.email}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default withRouter(Users);
