import React from 'react';

export default ({definitionText, attribution, pos}) => (
  <li className='word-definitions-index-item'>
    <div className='definition'>
      <span className={`pos-box ${pos}`}>{pos}</span>
      <span className='definition-text'>{definitionText}</span>
    </div>
    <div className='definition-source'>{attribution}</div>
  </li>
);
