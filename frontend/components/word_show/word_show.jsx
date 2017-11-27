import React from 'react';
import WordDefinitionsIndex from './word_definitions_index';
import WordExamplesIndex from './word_examples_index';
import WordShowHeader from './word_show_header';

export default class WordShow extends React.Component {
  componentDidMount() {
    this.props.querySingleWord(this.props.match.params.word);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.word !== newProps.match.params.word) {
      newProps.querySingleWord(newProps.match.params.word);
    }
  }

  renderContent() {
    const result = Object.keys(this.props.entities.words)[0];
    return (
      <div className='word-show-container'>
        <WordShowHeader />
        <div className='word-show fixed-width'>
          <h1 className='word-hero'>{result}</h1>
          <div className='word-show-content'>
            <div className='word-definitions-container'>
              <h2>Definitions of</h2>
              <strong>{result}</strong>
              <WordDefinitionsIndex
                definitions={this.props.entities.definitions} />
            </div>
            <div className='word-examples-container'>
              <h2>Usage Examples</h2>
              <p>
                <i className="fa fa-newspaper-o" aria-hidden="true"></i>
                <span>Real-world sources</span>
              </p>
              <WordExamplesIndex examples={this.props.entities.examples}
                                 word={result}/>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderErrors() {
    return(
      <div className='word-show-container'>
        <WordShowHeader />
        <div className='word-show fixed-width'>
          <h1 className='word-hero'>Uh oh...</h1>
          <h2 className='word-show-error-header'>
            Our lexicon is extensive, but we don't know that word.
          </h2>
          <div className='word-show-error'>
            <span>You searched for&nbsp;</span>
            <b>{this.props.match.params.word}</b>
            <span>. Perhaps the word was misspelled?</span>
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.errors.entities.length > 0) {
      return this.renderErrors();
    } else {
      return this.renderContent();
    }
  }
}
