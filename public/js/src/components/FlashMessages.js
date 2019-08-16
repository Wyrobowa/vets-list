import React, { useEffect, useState } from 'react';

const FlashMessages = ({ flash }) => {
  const [visibility, setVisibility] = useState(true);

  const handleRemove = (event) => {
    setVisibility(false);
  };

  if (visibility === true) {
    return (
      <div className="flash-messages">
        <div className={`flash flash--${flash.status}`}>
          <p className="flash__text">{flash.msg}</p>
          <button className="flash__remove" onClick={handleRemove}>&times;</button>
        </div>
      </div>
    );
  }
  return null;
}

export default FlashMessages;
