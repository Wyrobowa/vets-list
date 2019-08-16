import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import PropTypes from 'prop-types';

const Button = ({ buttonType, type, size, model, link, handleClick, id, children }) => {
  return (
    <span className={buttonType}>
      {link
        ? <Link to={`/admin/${link}`} className={`btn btn-${model}`}>
            {children}
          </Link>
        : <button type={type} className={`btn btn-${model} btn-${size}`} id={id} onClick={handleClick}>
            {children}
          </button>
      }
    </span>
  );
}

export default Button;
