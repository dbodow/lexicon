import React from 'react';

export default (props) => {
  const loadingStatus = props.loading ? '' : ' loaded';
  return (
    <div className={'word-show fade-in fixed-width' + loadingStatus}>
      <h1 className='word-hero'>Uh oh...</h1>
      <h2 className='word-show-error-header'>
        Our lexicon is extensive, but we can't find that word.
      </h2>
      <div className='word-show-error'>
        <span>You searched for&nbsp;
          <b>{props.word}</b>.&nbsp;
        </span>
        {renderErrorMessage(props.errors)}
      </div>
    </div>
  );
};

const renderErrorMessage = (errors=["default error"]) => {
  switch (errors[0]) {
    case "No result found":
      return noResultFoundMessage();
    case "Wordnik down":
      return wordnikDownMessage();
    default:
      return defaultMessage();
  }
};

const noResultFoundMessage = () => (
  <span>Perhaps the word was misspelled?</span>
);

const defaultMessage = () => (
  <span>An unexpected error occured. Please check back later.</span>
);

const wordnikDownMessage = () => (
  <span>
    However, we could not look up the word because our data provider is down.
    We'll send you an email with the word information when we resolve the issue!
  </span>
);
