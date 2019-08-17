import React from 'react';

const BackButton = ({ link }) => {
  return (
    <button className="btn btn-info btn-sm" onClick={link}>
      <i className="fas fa-arrow-left" />
      <span> Back</span>
    </button>
  );
}

export default BackButton;
