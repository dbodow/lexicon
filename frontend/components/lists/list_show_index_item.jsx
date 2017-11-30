import React from 'react';
import { Link } from 'react-router-dom';

export default class ListShowIndexItem extends React.Component {
  parseExampleTextEmphasis() {
    const exampleText = this.props.example || '';
    const word = this.props.word || '';
    return exampleText.split(word);
  }

  navigateToWordShow(e) {
    this.props.clearEntities();
    this.props.setUILoading();
    this.props.history.push(`/lookup/${this.props.word}`);
  }

  render() {
    const exampleTextPieces = this.parseExampleTextEmphasis();
    return (
      <li className='list-show-index-item'>
        <a onClick={this.navigateToWordShow.bind(this)}>
          {this.props.word}
        </a>
        <ul className='list-show-definition'>
          <li>
            {this.props.definition}
          </li>
        </ul>
        <div className='list-show-example'>
          <span>{exampleTextPieces[0]}</span>
          {exampleTextPieces.slice(1).map((textPiece, idx) => (
            <span key={idx}>
              <b>{this.props.word}</b>
              <span>{textPiece}</span>
            </span>
          ))}
        </div>
      </li>
    );
  }
}
