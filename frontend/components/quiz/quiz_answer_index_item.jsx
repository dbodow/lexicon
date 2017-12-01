import React from 'react';

export default class QuizAnswerIndexItem extends React.Component {
  render() {
    return (
      <li className={this.props.className} onClick={this.props.onClick}>
        &nbsp;{this.props.word}
      </li>
    );
  }
}
