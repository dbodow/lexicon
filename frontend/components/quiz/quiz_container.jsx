import Quiz from './quiz';
import { connect } from 'react-redux';
import { fetchQuizQuestion } from '../../actions/quiz_actions';
import { clearErrors } from '../../actions/error_actions';
import { setUILoading } from '../../actions/ui_actions';

const mapStateToProps = state => ({
  entities: state.entities,
  errors: state.errors,
  ui: state.ui
});

const mapDispatchToProps = dispatch => ({
  fetchQuizQuestion: isLastQuestionCorrect => dispatch(fetchQuizQuestion(isLastQuestionCorrect)),
  clearErrors: () => dispatch(clearErrors()),
  setUILoading: () => dispatch(setUILoading())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
