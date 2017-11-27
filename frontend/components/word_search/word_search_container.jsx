import WordSearch from './word_search.jsx';
import { connect } from 'react-redux';
import { queryPossibleWords } from '../../actions/word_actions';
import { clearErrors } from '../../actions/error_actions';

const mapStateToProps = state => ({
  search: state.entities.search,
  errors: state.errors.entities
});

const mapDispatchToProps = dispatch => ({
  queryPossibleWords: query => dispatch(queryPossibleWords(query)),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WordSearch);
