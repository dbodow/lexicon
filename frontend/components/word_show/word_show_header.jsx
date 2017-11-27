import React from 'react';
import { Link } from 'react-router-dom';

export default class WordShowHeader extends React.Component {
  // bonus: add a random-word search buttom in the header instead of link
  constructor() {
    super();
  }

  render() {
    return(
      <div className="word-show-header">
        <div className="word-show-header-content fixed-width">
          <h2>Lexicon Dictionary</h2>
          <Link to='/lookup'>Back to word lookup</Link>
        </div>
      </div>
    );
  }
}
