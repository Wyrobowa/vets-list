import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const TagList = (props) => {
  return (
    props.tags.map((tag) => (<Link key={tag._id} className="tag" id={tag._id} to={`/tag/${tag.slug}`}>{tag.name}</Link>))
  );
}

export default TagList;
