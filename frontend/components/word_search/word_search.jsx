import React from 'react';
import WordShowHeader from '../word_show/word_show_header';
import WordSearchForm from './word_search_form';
import WordSearchResultsIndex from './word_search_results_index';
import { PulseLoader } from 'react-spinners';

export default class WordSearch extends React.Component {
  componentWillMount() {
    this.props.clearErrors();
    this.props.clearEntities();
  }

  render() {
    const loadingStatus = this.props.ui.loading ? '' : ' loaded';
    return (
      <div className="word-search-container">
        <WordShowHeader />
        <div className="word-search fixed-width">
          <div className='spinner'>
            <PulseLoader
              color={'#438007'}
              loading={this.props.ui.loading}
              />
          </div>
          <WordSearchForm queryPossibleWords={this.props.queryPossibleWords}
                          clearErrors={this.props.clearErrors} />
          <WordSearchResultsIndex
            search={this.props.search} errors={this.props.errors}
            history={this.props.history} ui={this.props.ui}
            setUILoading={this.props.setUILoading}
            className={'fade-in' + loadingStatus} />
        </div>
      </div>
    );
  }
}
