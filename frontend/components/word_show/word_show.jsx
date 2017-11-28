import React from 'react';
import WordDefinitionsIndex from './word_definitions_index';
import WordExamplesIndex from './word_examples_index';
import WordShowHeader from './word_show_header';
import WordShowErrors from './word_show_errors';
import ContentLoader from '../loaders/content_loader';
import { PulseLoader } from 'react-spinners';

export default class WordShow extends React.Component {
  componentDidMount() {
    this.props.querySingleWord(this.props.match.params.word);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.word !== newProps.match.params.word) {
      newProps.querySingleWord(newProps.match.params.word);
    }
  }

  renderMainContent() {
    const result = Object.keys(this.props.entities.words)[0];
    const loadingStatus = this.props.ui.loading ? '' : ' loaded';
    // console.log('loading status', loadingStatus, this.props.ui.loading);
    return (
      <div className='word-show-container'>
        <WordShowHeader />
        <div className='spinner'>
          <PulseLoader
            color={'#438007'}
            loading={this.props.ui.loading}
            />
        </div>
        <div className={'word-show fade-in fixed-width' + loadingStatus}>
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
        <div className='spinner'>
          <PulseLoader
            color={'#438007'}
            loading={this.props.ui.loading}
            />
        </div>
        <WordShowErrors word={this.props.match.params.word}
                        loading={this.props.ui.loading}/>
      </div>
    );
  }

  render() {
    if (this.props.errors.entities.length > 0) {
      return this.renderErrors();
    } else {
      return this.renderMainContent();
    }
  }
}
