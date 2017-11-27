import React from 'react';

export default (props) => (
  <div className='word-show fixed-width'>
    <h1 className='word-hero'>Uh oh...</h1>
    <h2 className='word-show-error-header'>
      Our lexicon is extensive, but we don't know that word.
    </h2>
    <div className='word-show-error'>
      <span>You searched for&nbsp;</span>
      <b>{props.word}</b>
      <span>. Perhaps the word was misspelled?</span>
    </div>
  </div>
);
