import React from 'react';
import WordDefinitionsIndexItem from './word_definitions_index_item';

export default class WordDefinitionsIndex extends React.Component {
  render () {
    const definitionIds = Object.keys(this.props.definitions);
    return (
      <ol className='word-definitions-index'>
        {definitionIds.map(id => (
          <WordDefinitionsIndexItem
            key={`definition-${id}`}
            definitionText={this.props.definitions[id].definition}
            pos={this.props.definitions[id].pos}
            attribution={this.props.definitions[id].attribution} />
        ))}
      </ol>
    );
  }
}
