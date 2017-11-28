import WordSearch from './word_search.jsx';
import { connect } from 'react-redux';
import { queryPossibleWords } from '../../actions/word_actions';
import { clearErrors } from '../../actions/error_actions';
import { withRouter } from 'react-router-dom';
import { setUILoading,
         clearUILoading } from '../../actions/ui_actions';
import { clearEntities } from '../../actions/entities_actions';

const mapStateToProps = state => ({
  search: state.entities.search,
  ui: state.ui,
  errors: state.errors.entities
});

const mapDispatchToProps = dispatch => ({
  queryPossibleWords: query => dispatch(queryPossibleWords(query)),
  clearErrors: () => dispatch(clearErrors()),
  setUILoading: () => dispatch(setUILoading()),
  clearUILoading: () => dispatch(clearUILoading()),
  clearEntities: () => dispatch(clearEntities())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(WordSearch));
