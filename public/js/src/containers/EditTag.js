import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router";

import BackButton from '../components/BackButton';
import Button from '../components/Button';
import Icon from '../components/Icon';


const EditTag = (props) => {
  const [tagData, setTag] = useState({
    name: '',
  });

  useEffect(() => {
    fetch(`/api/admin/tag/${props.match.params.id}/edit`)
      .then(response => response.json())
      .then((data) => {
        setTag(data);
      })
  }, []);

  const handleChange = (event) => {
    setTag({
      [event.target.name]: event.target.value,
    })
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (event.target.nodeName === 'I') {
      event.target = event.target.parentNode;
    }

    fetch(`/api/admin/tag/${props.match.params.id}/edit`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tagData }),
     })
     .then(response => response.json())
     .then((data) => {
       console.log(data);
       if (data.status === 'success') {
         props.history.push({
          pathname: '/admin/tags',
          state: data,
        });
       }
     });
  };

  return (
    <div className="tag-container">
      <h1>{`Edit tag: ${tagData.name}`}</h1>
      <BackButton link={props.history.goBack} />
      <form>
        <div className="form-group">
          <label>Tag Name</label>
          <input className="form-control" type="text" name="name" placeholder="Name" value={tagData.name} onChange={handleChange} />
        </div>
        <Button buttonType="button" type="submit" size="normal" model="success" handleClick={handleSubmit}>
          <Icon type="edit" />
          Edit tag
        </Button>
      </form>
    </div>
  );
};

export default withRouter(EditTag);
