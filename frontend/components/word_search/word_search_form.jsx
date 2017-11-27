import React from 'react';

export default class WordSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.clearState = {
      query: ''
    };
    this.state = this.clearState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleChange(e) {
    this.setState({ query: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.clearErrors();
    this.props.queryPossibleWords(this.state.query);
  }

  handleClear(e) {
    this.setState(this.clearState);
    e.target.value = '';
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="word-search-form">
        <button className="search-bar-submit-icon-container icon-button-container"
                onClick={this.handleSubmit}>
          <i className="fa fa-search search-bar-submit-icon"
            aria-hidden="true"/>
        </button>
        <input type='text' onChange={this.handleChange} required
               className="word-search-bar" placeholder="LOOK UP" />
        <button type="reset" className="search-bar-close-container icon-button-container"
                onClick={this.handleClear}>
          <i className="fa fa-times-circle search-bar-close"
            aria-hidden="true"/>
        </button>
      </form>
    );
  }
}
