import React from 'react';
import NewList from '../lists/new_list_spinner_free';
import shuffle from 'lodash/shuffle';
import QuizAnswerIndexItem from './quiz_answer_index_item';

const PRISTINE = 'PRISTINE';
const WRONG = 'WRONG';
const CORRECT = 'CORRECT'

export default class Quiz extends React.Component {

  constructor() {
    super();
    this.state = {
      answerChoices: [],
      isLastQuestionCorrect: false,
      lastGuessStatus: PRISTINE,
      answerLoaded: false,
      clickedGuesses: []
    };
  }

  componentWillMount() {
    this.props.setUILoading();
    this.props.fetchQuizQuestion().then(this.randomizeAnswers.bind(this));
  }

  fetchNextQuestion() {
    this.props.setUILoading();
    this.props.fetchQuizQuestion(this.state.isLastQuestionCorrect)
      .then(() => this.randomizeAnswers());
    this.setState({
      isLastQuestionCorrect: false,
      lastGuessStatus: PRISTINE,
      answerLoaded: false
    });
  }

  proceedToNextQuestion() {
    if (this.state.lastGuessStatus === CORRECT) this.fetchNextQuestion();
  }

  questionWord() {
    const words = Object.keys(this.props.entities.words);
    return (words.length > 0) ? words[0] : "" ;
  }

  wrongAnswers() {
    if (this.props.ui.loading) return;
    return (
      this.props.entities.quiz.hasOwnProperty('wrong') ?
        this.props.entities.quiz.wrong : []
    );
  }

  correctAnswer() {
    if (this.props.ui.loading) return;
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
        return "\xa0";
      case WRONG:
        return "Not quite...";
      case CORRECT:
        return "Good Job!";
    }
  }

  isCorrectAnswer(word) {
    return word === this.correctAnswer();
  }

  handleGuess(word) {
    if (this.state.lastGuessStatus === CORRECT) return;
    if (this.props.entities.quiz.correct === word) {
      this.handleCorrectAnswer(word);
    } else {
      this.handleWrongAnswer(word);
    }
  }

  handleCorrectAnswer(word) {
    const correctOnFirstTry = (this.state.lastGuessStatus === PRISTINE);
    const clickedGuesses = Array.from(
      new Set(this.state.clickedGuesses.concat([word]))
    );
    this.setState ({
      isLastQuestionCorrect: correctOnFirstTry,
      lastGuessStatus: CORRECT,
      answerLoaded: true,
      clickedGuesses
    });
  }

  handleWrongAnswer(word) {
    const clickedGuesses = Array.from(
      new Set(this.state.clickedGuesses.concat([word]))
    );
    this.setState({
      isLastQuestionCorrect: false,
      lastGuessStatus: WRONG,
      clickedGuesses
    });
  }

  answerLoadedClass() {
    return this.state.answerLoaded ? "loaded" : "";
  }

  guessMessageClass() {
    switch (this.state.lastGuessStatus) {
      case PRISTINE:
        return "";
      case WRONG:
        return "loaded message-answer-wrong";
      case CORRECT:
        return "loaded message-answer-correct";
    }
  }

  clickedAnswerClass(word) {
    const wasClicked = this.state.clickedGuesses.includes(word);
    if (wasClicked && this.isCorrectAnswer(word)) {
      return "quiz-answer-correct";
    } else if (wasClicked) {
      return "quiz-answer-wrong";
    } else if (this.state.lastGuessStatus === CORRECT) {
      return "quiz-answer-unanswered";
    } else {
      return "";
    }
  }

  render() {
    return(
      <div className='quiz-container'>
        <div className='quiz'>
          <div className='quiz-back-button'></div>
          <div className='quiz-content'>
            <div className='quiz-content-top'>
              <div className='quiz-questions'>
                <div className='quiz-questions-box'>
                  <h1><b>{this.questionWord()}</b> means:</h1>
                  <ul className='quiz-answer-index'>
                    {this.state.answerChoices.map(answerChoice => (
                      <QuizAnswerIndexItem key={answerChoice}
                        word={answerChoice} onClick={this.handleGuess.bind(this, answerChoice)}
                        correct={this.isCorrectAnswer(answerChoice)}
                        className={`quiz-answer-index-item ${this.clickedAnswerClass(answerChoice)}`}/>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={`quiz-answers ${this.answerLoadedClass()}`}>
                <div className='quiz-answer-definition'>
                  {this.solution().definition}
                </div>
                <div className='quiz-answer-example'>
                  {this.solution().example}
                </div>
              </div>
            </div>
            <h2 className={`quiz-guess-message ${this.guessMessageClass()}`}>
              {this.renderGuessMessage()}
            </h2>
          </div>
          <div className={`quiz-next-button ${this.answerLoadedClass()}`}
               onClick={this.proceedToNextQuestion.bind(this)}>
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
