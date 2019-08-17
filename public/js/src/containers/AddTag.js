import React, { useState } from 'react';
import { withRouter } from "react-router";

import BackButton from '../components/BackButton';
import Button from '../components/Button';
import Icon from '../components/Icon';

const AddTag = (props) => {
  const [tagData, setTag] = useState({
    name: '',
  });

  const handleChange = (event) => {
    setTag({
      [event.target.name]: event.target.value,
    })
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('/api/admin/tag/add', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tagData }),
     })
     .then(response => response.json())
     .then((data) => {
       if (data.status === 'success') {
         props.history.push({
          pathname: '/admin/tags',
          state: data,
        });
       }
     });
  };

  return (
    <div className="tag">
      <h1>Add new tag</h1>
      <BackButton link={props.history.goBack} />
      <form>
        <div className="form-group">
          <label>Tag Name</label>
          <input className="form-control" type="text" name="name" placeholder="Name" onChange={handleChange} />
        </div>
        <Button buttonType="button" type="submit" size="normal" model="success" handleClick={handleSubmit}>
          <Icon type="add" />
          Add tag
        </Button>
      </form>
    </div>
  );
};

export default withRouter(AddTag);
