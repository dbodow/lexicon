import React from 'react';

export default class NewList extends React.Component {
  constructor() {
    super();
    const _nullState = {
      title: '',
      description: '',
      wordsList: ''
    };
    this.oneHundredYearsWordsSample = {
      wordsList: 'nostalgia, lament, resignation, disdain, credulous, insomnia, indolent, enigma, patriarch, rancor'
    };
    this.SSATWordsSample = {
      wordsList: 'abhor, benevolent, debase, effervescent, furtive, impetuous, opulent, spurious, superfluous, celestial'
    };
    this.chemistryWordsSample = {
      wordsList: 'molarity, acid, titrate, entropy, enthalpy, absorbance, molecule, oxidation, catalyst, quark'
    };
    this.state = _nullState;
  }

  componentWillMount() {
    this.props.clearEntities();
  }

  componentWillReceiveProps(nextProps) {
    const listKeys = Object.keys(nextProps.entities.lists);
    if (listKeys.length > 0) {
      this.props.history.push(`/lists/${listKeys[0]}`);
    }
  }

  validateRequiredFields() {
    const errors = [];
    if (!this.state.title) errors.push("Title cannot be empty.");
    if (this.wordsListToArray(this.state.wordsList).length === 0) {
      errors.push("Please select some words for your list.");
    }
    if (this.wordsListToArray(this.state.wordsList).length > 20) {
      errors.push("Lexicon relies on a free API to locate data for our users' lists. Please limit yourself to only 20 words per list so that we can remain within our API call limit.");
    }
    if (errors.length !== 0) {
      alert(errors.join('\n'));
      return false;
    }
    return true;
  }

  wordsListToArray() {
    const words = this.state.wordsList.split(/[^A-Za-z'-]/).filter(Boolean);
    return Array.from(new Set(words));
  }

  handlePopulate(stateSlice) {
    return e => this.setState(stateSlice);
  }

  handleChange(stateSlice) {
    return e => {
      this.setState({
        [stateSlice]: e.target.value
      });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.validateRequiredFields()) {
      return;
    }
    const submissionList = {
      title: this.state.title,
      description: this.state.description,
      words: this.wordsListToArray(this.state.wordsList)
    };
    this.props.createList(submissionList);
  }

  render () {
    return (
      <form className="new-list-form fixed-width">
        <h1>Need to learn some new words?</h1>
        <h2>Create a list of any words you want to quiz.</h2>
        <div className="flex-content">
          <div className='col-1-3'>
            <input type='text' placeholder='Give your list a title. e.g. "GRE Cram"'
                   onChange={this.handleChange('title')}
                   id="title"/>
            <textarea placeholder="Give your list an optional description."
                      onChange={this.handleChange('description')}
                      id="description" />
          </div>
          <div className='col-2-3'>
            <textarea placeholder="Type in a list of words you want to learn."
                      onChange={this.handleChange('wordsList')}
                      id="wordsList" value={this.state.wordsList} />
          </div>
        </div>
        <div className='new-list-create-button'
             onClick={this.handleSubmit.bind(this)}>
          Create List&nbsp;
          <i className="fa fa-chevron-right" aria-hidden="true"/>
        </div>
        <h3>Only want to test? Try a sample word list:</h3>
        <div className='sample-list-button'
             onClick={this.handlePopulate(this.oneHundredYearsWordsSample)}>
          100 Years of Solitude
        </div>
        <div className='sample-list-button'
             onClick={this.handlePopulate(this.SSATWordsSample)} >
          Common SSAT Words
        </div>
        <div className='sample-list-button'
             onClick={this.handlePopulate(this.chemistryWordsSample)} >
          Chemistry 101
        </div>
      </form>
    );
  }
}
