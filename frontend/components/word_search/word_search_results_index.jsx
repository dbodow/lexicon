import React from 'react';
import { Link } from 'react-router-dom';
import WordShowErrors from '../word_show/word_show_errors';
import { ActionLink } from '../../util/route_util';

export default class WordSearchResultsIndex extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.search.length === 1 && !nextProps.ui.loading) {
      this.props.setUILoading();
      this.redirectToWord(`lookup/${nextProps.search[0]}`);
    }
  }

  redirectToWord(path) {
    this.props.setUILoading();
    this.props.history.push(path);
  }

  renderSuggestedMatches() {
    const results = this.props.search.sort();
    return (
      <div className="suggested-word-search-content">
        <div className="top-suggestion-container">
          <h1 className="word-show-error-header">Did you mean?</h1>
          <h2><a onClick={this.redirectToWord.bind(this, `lookup/${results[0]}`)}>
            {results[0]}
          </a></h2>
        </div>
        <div className="more-suggestions-container">
          <h1 className="more-suggestions-header">More Suggestions:</h1>
          <ul>
            {results.slice(1).map( result => (
              <li key={result}>
                <a onClick={this.redirectToWord.bind(this, `lookup/${result}`)}>
                  {result}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  renderNoMatch() {
    return (
      <WordShowErrors
        word={this.props.errors[1]}
        errors={this.props.errors} />
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
              <li><ActionLink to="lookup/bumfuzzle"
                text="bumfuzzle"
                action={this.props.setUILoading}
                history={this.props.history}/></li>
              <li><ActionLink to="lookup/defenestrate"
                text="defenestrate"
                action={this.props.setUILoading}
                history={this.props.history}/></li>
              <li><ActionLink to="lookup/flocculent"
                text="flocculent"
                action={this.props.setUILoading}
                history={this.props.history}/></li>
              <li><ActionLink to="lookup/frogman"
                text="frogman"
                action={this.props.setUILoading}
                history={this.props.history}/></li>
              <li><ActionLink to="lookup/logophile"
                text="logophile"
                action={this.props.setUILoading}
                history={this.props.history}/></li>
            </ul>
          </div>
          <div className='demo-words'>
            <h3>
              <i className="fa fa-music" aria-hidden="true"></i>
              Music
            </h3>
            <p>Learn vocabulary from a new field</p>
            <ul className="demo-words-index">
              <li><ActionLink to="lookup/aria"
                text="aria"
                action={this.props.setUILoading}
                history={this.props.history}/></li>
              <li><ActionLink to="lookup/fugue"
                text="fugue"
                action={this.props.setUILoading}
                history={this.props.history}/></li>
              <li><ActionLink to="lookup/leitmotif"
                text="leitmotif"
                action={this.props.setUILoading}
                history={this.props.history}/></li>
              <li><ActionLink to="lookup/octave"
                text="octave"
                action={this.props.setUILoading}
                history={this.props.history}/></li>
              <li><ActionLink to="lookup/timbre"
                text="timbre"
                action={this.props.setUILoading}
                history={this.props.history}/></li>
            </ul>
          </div>
          <div className='demo-words'>
            <h3>
              <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
              SSAT
            </h3>
            <p>Study for the big exam</p>
            <ul className="demo-words-index">
              <li><ActionLink to="lookup/corpulent"
                text="corpulent"
                action={this.props.setUILoading}
                history={this.props.history}/></li>
              <li><ActionLink to="lookup/diaphanous"
                text="diaphanous"
                action={this.props.setUILoading}
                history={this.props.history}/></li>
              <li><ActionLink to="lookup/enervate"
                text="enervate"
                action={this.props.setUILoading}
                history={this.props.history}/></li>
              <li><ActionLink to="lookup/melancholy"
                text="melancholy"
                action={this.props.setUILoading}
                history={this.props.history}/></li>
              <li><ActionLink
                to="lookup/terrestrial"
                history={this.props.history}
                action={this.props.setUILoading}
                text="terrestrial"/></li>
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
