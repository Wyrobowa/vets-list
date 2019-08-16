import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router";

import Flash from '../components/FlashMessages';
import Button from '../components/Button';
import Icon from '../components/Icon';

const Tags = (props) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetch('/api/admin/tags')
      .then(response => response.json())
      .then(data => setTags(data));
  }, []);

  const removeTag = (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (event.target.nodeName === 'I') {
      event.target = event.target.parentNode;
    }

    const { id } = event.target;

    fetch(`/api/admin/tag/${id}/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tags } )
      })
      .then(response => response.json())
      .then((data) => {
        if (data.status === 'success') {
          const updatedTags = tags.filter(tag => tag._id !== id)
          setTags(updatedTags);
        }
      });
  }

  return (
    <div className="tags table-hover">
      {props.location.state
        && <Flash flash={props.location.state} />
      }
      <div className="title">
        <h1>Tags List</h1>
        <Button buttonType="link" model="info" link='tag/add'>
          <Icon type="add" />
          Add new tag
        </Button>
      </div>
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
                <td>
                  <Button buttonType="link" model="info" link={`tag/${tag._id}/edit`}>
                    <Icon type="edit" />
                  </Button>
                  <Button buttonType="button" type="button" size="small" model="danger" handleClick={removeTag} id={tag._id}>
                    <Icon type="delete" />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default withRouter(Tags);
