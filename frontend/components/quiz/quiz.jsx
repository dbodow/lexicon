import React from 'react';
import NewList from '../lists/new_list';
import shuffle from 'lodash/shuffle';

const PRISTINE = 'PRISTINE';
const WRONG = 'WRONG';
const CORRECT = 'CORRECT'

export default class Quiz extends React.Component {

  constructor() {
    super();
    this.state = {
      answerChoices: [],
      isLastQuestionCorrect: false,
      lastGuessStatus: PRISTINE
    };
  }

  componentWillMount() {
    this.props.setUILoading();
    this.props.fetchQuizQuestion().then(this.randomizeAnswers.bind(this));
  }

  fetchNextQuestion() {
    this.props.setUILoading();
    this.props.fetchQuizQuestion(this.state.isLastQuestionCorrect)
      .then(this.randomizeAnswers());
  }

  questionWord() {
    const words = Object.keys(this.props.entities.words);
    return (words.length > 0) ? words[0] : "" ;
  }

  wrongAnswers() {
    return (
      this.props.entities.quiz.hasOwnProperty('wrong') ?
        this.props.entities.quiz.wrong : []
    );
  }

  correctAnswer() {
    return (
      this.props.entities.quiz.hasOwnProperty('correct') ?
        this.props.entities.quiz.correct : ""
    );
  }

  solution() {
    const words = Object.keys(this.props.entities.words);
    const word = (words.length > 0) ? this.props.entities.words[words[0]] : "";
    const definition = word ? this.props.entities.definitions[word.definitions[0]].definition : "";
    const example = word ? this.props.entities.examples[word.examples[0]].example : "";
    return {definition, example};
  }

  randomizeAnswers() {
    const answers = this.wrongAnswers().concat([this.correctAnswer()]);
    this.setState({
      answerChoices: shuffle(answers)
    });
  }

  renderGuessMessage() {
    switch (this.state.lastGuessStatus) {
      case PRISTINE:
        return "";
      case WRONG:
        return "Not quite...";
      case CORRECT:
        return "Good Job!";
    }
  }

  render() {
    console.log(this.solution());
    return(
      <div className='quiz-container'>
        <div className='quiz'>
          <div className='quiz-back-button'></div>
          <div className='quiz-content'>
              <div className='quiz-questions'>
                <div className='quiz-questions-box'>
                  <h1><b>{this.questionWord()}</b> means:</h1>
                  {this.state.answerChoices}
                </div>
                <h2>{this.renderGuessMessage()}</h2>
              </div>
              <div className='quiz-answers'>
                <div className='quiz-answer-definition'>
                  {this.solution().definition}
                </div>
                <div className='quiz-answer-example'>
                  {this.solution().example}
                </div>
            </div>
          </div>
          <div className='quiz-next-button'
               onClick={this.fetchNextQuestion.bind(this)}>
            <i className="fa fa-chevron-right fa-5x" aria-hidden="true"/>
          </div>
        </div>
        <div className='quiz-footer'>
          <div className='fixed-width'>
            <h1>Currently Playing</h1>
            <h2>Synonyms Quiz</h2>
          </div>
        </div>
        <NewList clearEntities={this.props.clearEntities}
          ui={this.props.ui} createList={this.props.createList}
          history={this.props.history} entities={this.props.entities}/>
      </div>
    );
  }
}
