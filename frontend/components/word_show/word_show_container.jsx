import WordShow from './word_show.jsx';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { querySingleWord } from '../../actions/word_actions';
import { clearErrors } from '../../actions/error_actions';
import { setUILoading } from '../../actions/ui_actions';

const mapStateToProps = state => ({
  entities: state.entities,
  errors: state.errors,
  ui: state.ui
});

const mapDispatchToProps = dispatch => ({
  querySingleWord: query => dispatch(querySingleWord(query)),
  clearErrors: () => dispatch(clearErrors()),
  setUILoading: () => dispatch(setUILoading())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(WordShow));
