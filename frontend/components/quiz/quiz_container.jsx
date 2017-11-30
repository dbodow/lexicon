import Quiz from './quiz';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchQuizQuestion } from '../../actions/quiz_actions';
import { clearErrors } from '../../actions/error_actions';
import { setUILoading } from '../../actions/ui_actions';
import { clearEntities } from '../../actions/entities_actions';
import { createList } from '../../actions/list_actions';

const mapStateToProps = state => ({
  entities: state.entities,
  errors: state.errors,
  ui: state.ui
});

const mapDispatchToProps = dispatch => ({
  fetchQuizQuestion: isLastQuestionCorrect => dispatch(fetchQuizQuestion(isLastQuestionCorrect)),
  clearErrors: () => dispatch(clearErrors()),
  setUILoading: () => dispatch(setUILoading()),
  clearEntities: () => dispatch(clearEntities()),
  createList: list => dispatch(createList(list))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz));
