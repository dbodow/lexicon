import React from 'react';

export default ({definitionText, attribution, pos}) => (
  <li className='word-definitions-index-item'>
    <span className='pos'>{pos}</span>
    <span className='definition-text'>{definitionText}</span>
    <span className='definition-source'>{attribution}</span>
  </li>
);
