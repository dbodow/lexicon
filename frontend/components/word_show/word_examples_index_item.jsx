import React from 'react';

export default ({exampleText, exampleSource, word}) => (
  <li className='word-examples-index-item'>
    <div className='example-text'>
      <span>{exampleText[0]}</span>
      {exampleText.slice(1).map((textPiece, idx) => (
        <span key={idx}>
          <b>{word}</b>
          <span>{textPiece}</span>
        </span>
      ))}
    </div>
    <div className='example-source'>{exampleSource}</div>
  </li>
);
