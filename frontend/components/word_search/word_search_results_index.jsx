import React from 'react';
import { Link } from 'react-router-dom';
import WordShowErrors from '../word_show/word_show_errors';


export default class WordSearchResultsIndex extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.search.length === 1 && !nextProps.ui.loading) {
      nextProps.history.push(`lookup/${nextProps.search[0]}`);
    }
  }

  renderSuggestedMatches() {
    const results = this.props.search.sort();
    return (
      <div className="suggested-word-search-content">
        <div className="top-suggestion-container">
          <h1 className="word-show-error-header">Did you mean?</h1>
          <h2><Link to={`lookup/${results[0]}`}>{results[0]}</Link></h2>
        </div>
        <div className="more-suggestions-container">
          <h1 className="more-suggestions-header">More Suggestions:</h1>
          <ul>
            {results.slice(1).map( result => (
              <li key={result}>
                <Link to={`lookup/${result}`}>{result}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  renderNoMatch() {
    return (
      <WordShowErrors word={this.props.errors[0]} />
    );
  }

  renderPristine() {
    return(
      <div className="pristine-word-search-content">
        <h1>Look up new vocabulary words with Lexicon's powerful dictionary.</h1>
        <h2>Our dictionary provides extensive results by querying up to
        five different sources and a corpus of real-world usage examples.
        Don't just learn a word - see how others use it in the
        real world too.</h2>
        <p>Not sure where to start? Try looking up one of our favorite words:</p>
        <div className='demo-words-container'>
          <div className='demo-words'>
            <h3>
              <i className="fa fa-star" aria-hidden="true"></i>
              Fun
            </h3>
            <p>Enjoy the English language</p>
            <ul className="demo-words-index">
              <li><Link to="lookup/bumfuzzle">bumfuzzle</Link></li>
              <li><Link to="lookup/defenestrate">defenestrate</Link></li>
              <li><Link to="lookup/flocculent">flocculent</Link></li>
              <li><Link to="lookup/frogman">frogman</Link></li>
              <li><Link to="lookup/logophile">logophile</Link></li>
            </ul>
          </div>
          <div className='demo-words'>
            <h3>
              <i className="fa fa-music" aria-hidden="true"></i>
              Music
            </h3>
            <p>Learn vocabulary from a new field</p>
            <ul className="demo-words-index">
              <li><Link to="lookup/aria">aria</Link></li>
              <li><Link to="lookup/fugue">fugue</Link></li>
              <li><Link to="lookup/leitmotif">leitmotif</Link></li>
              <li><Link to="lookup/octave">octave</Link></li>
              <li><Link to="lookup/timbre">timbre</Link></li>
            </ul>
          </div>
          <div className='demo-words'>
            <h3>
              <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              SSAT
            </h3>
            <p>Study for the big exam</p>
            <ul className="demo-words-index">
              <li><Link to="lookup/corpulent">corpulent</Link></li>
              <li><Link to="lookup/diaphanous">diaphanous</Link></li>
              <li><Link to="lookup/enervate">enervate</Link></li>
              <li><Link to="lookup/melancholy">melancholy</Link></li>
              <li><Link to="lookup/terrestrial">terrestrial</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.search.length > 1) {
      return this.renderSuggestedMatches();
    } else if (this.props.errors.length > 0) {
      return this.renderNoMatch();
    } else {
      return this.renderPristine();
    }
  }
}
