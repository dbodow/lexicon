import React from 'react';
import WordDefinitionsIndex from './word_definitions_index';
import WordExamplesIndex from './word_examples_index';
import WordShowHeader from './word_show_header';

export default class WordShow extends React.Component {
  componentDidMount() {
    this.props.querySingleWord(this.props.match.params.word);
  }

  render() {
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
              <WordExamplesIndex examples={this.props.entities.examples} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
