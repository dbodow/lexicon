import React from 'react';

export default ({exampleText, exampleSource}) => (
  <li className='word-examples-index-item'>
    <span className='example-text'>{exampleText}</span>
    <span className='example-source'>{exampleSource}</span>
  </li>
);
