import WordShow from './word_show.jsx';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { querySingleWord } from '../../actions/word_actions';
import { clearErrors } from '../../actions/error_actions';

const mapStateToProps = state => ({
  entities: state.entities,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  querySingleWord: query => dispatch(querySingleWord(query)),
  clearErrors: () => dispatch(clearErrors()),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(WordShow));
