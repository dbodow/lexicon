import React from 'react';
import WordShowHeader from '../word_show/word_show_header';
import WordSearchForm from './word_search_form';
import WordSearchResultsIndex from './word_search_results_index';

export default class WordSearch extends React.Component {
  componentWillMount() {
    this.props.clearErrors();
  }

  render() {
    return (
      <div className="word-search-container">
        <WordShowHeader />
        <div className="word-search fixed-width">
          <WordSearchForm queryPossibleWords={this.props.queryPossibleWords}
                          clearErrors={this.props.clearErrors} />
          <WordSearchResultsIndex search={this.props.search}
                                  errors={this.props.errors}/>
        </div>
      </div>
    );
  }
}
