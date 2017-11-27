import React from 'react';
import { Link } from 'react-router-dom';


export default class WordSearchResultsIndex extends React.Component {
  renderPerfectMatch() {
    return (
      <div>
        perfect match
      </div>
    );
  }

  renderSuggestedMatches() {
    const results = this.props.search.sort();
    return (
      <div>
        <span>Top Result: {results[0]}</span>
        {results.slice(1).map( result => (
          <div key={result}>
            <Link to={`lookup/${result}`}>{result}</Link>
          </div>
        ))}
      </div>
    );
  }

  renderNoMatch() {
    return (
      <div>
        {this.props.errors}
        no match
      </div>
    );
  }

  renderPristine() {
    return(
      <div>
        why not try a search?
      </div>
    );
  }

  render() {
    if (this.props.search.length > 1) {
      return this.renderSuggestedMatches();
    } else if (this.props.search.length === 1) {
      return this.renderPerfectMatch();
    } else if (this.props.errors.length > 0) {
      return this.renderNoMatch();
    } else {
      return this.renderPristine();
    }
  }
}
