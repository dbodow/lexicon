import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div className="word-show-header">
    <div className="word-show-header-content fixed-width">
      <h2>Lexicon Dictionary</h2>
      <Link to={'/'} >Random Word</Link>
    </div>
  </div>
);
