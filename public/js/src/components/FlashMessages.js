import React, { useEffect, useState } from 'react';

const FlashMessages = ({ flash }) => (
  <div className="flash-messages">
    <div className={`flash flash--${flash.status}`}>
      <p className="flash__text">{flash.msg}</p>
    </div>
  </div>
);

export default FlashMessages;
