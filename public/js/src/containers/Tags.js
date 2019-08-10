import React, { useEffect, useState } from 'react';

import ActionButtons from '../components/ActionButtons';

const Tags = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch('/api/admin/tags')
      .then(response => response.json())
      .then(data => setTags(data));
  }, []);

  return (
    <div className="tags">
      <h1>Tags List</h1>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tags.map((tag) => {
            return (
              <tr key={tag._id}>
                <td>{tag.name}</td>
                <td><ActionButtons/></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      
    </div>
  );
}

export default Tags;
