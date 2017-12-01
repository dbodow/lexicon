import React from 'react';
import WordExamplesIndexItem from './word_examples_index_item';

export default class WordExamplesIndex extends React.Component {
  parseExampleTextEmphasis(id) {
    const exampleText = this.props.examples[id].example;
    const word = this.props.word;
    return exampleText.split(word);
  }

  render () {
    const exampleIds = Object.keys(this.props.examples);
    return (
      <ul className='word-examples-index'>
        {exampleIds.map(id => (
          <WordExamplesIndexItem
            key={`example-${id}`}
            exampleText={this.parseExampleTextEmphasis(id)}
            exampleSource={this.props.examples[id].exampleSource}
            word={this.props.word} />
        ))}
      </ul>
    );
  }
}
