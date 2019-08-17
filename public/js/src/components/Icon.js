import React from 'react';

const Icon = ({ type }) => {
  let icon = '';

  switch (type) {
    case 'add':
      icon = 'plus';
      break;
    case 'edit':
      icon = 'edit';
      break;
    case 'delete':
      icon = 'trash';
      break;
    case 'back':
      icon = 'arrow-left';
      break;
    default:
      return null;
  }

  return (
    <i className={`fas fa-${icon}`}></i>
  );
}

export default Icon;
