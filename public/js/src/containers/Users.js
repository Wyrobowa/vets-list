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

  const removeUser = (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (event.target.nodeName === 'I') {
      event.target = event.target.parentNode;
    }

    const { id } = event.target;

    fetch(`/api/admin/user/${id}/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ users } )
      })
      .then(response => response.json())
      .then((data) => {
        if (data.status === 'success') {
          const updatedUsers = users.filter(user => user._id !== id)
          setUsers(updatedUsers);
        }
      });
  }

  return (
    <div className="users-container">
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
              <td>
                <Button buttonType="link" model="info" link={`user/${user._id}/edit`}>
                  <Icon type="edit" />
                </Button>
                <Button buttonType="button" type="button" size="small" model="danger" handleClick={removeUser} id={user._id}>
                  <Icon type="delete" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default withRouter(Users);
