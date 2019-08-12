import React, { useEffect, useState } from 'react';

import ActionButtons from '../components/ActionButtons';
import AddButton from '../components/AddButton';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/admin/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div className="users">
      <h1>Users List</h1>
      <AddButton/>
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
              <td><ActionButtons/></td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}

export default Users;
