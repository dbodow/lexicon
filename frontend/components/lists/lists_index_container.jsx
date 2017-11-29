import ListsIndex from './lists_index';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchListsIndex } from '../../actions/list_actions';
import { clearErrors } from '../../actions/error_actions';
import { setUILoading } from '../../actions/ui_actions';

const mapStateToProps = state => ({
  lists: state.entities.lists,
  errors: state.errors,
  ui: state.ui
});

const mapDispatchToProps = dispatch => ({
  fetchListsIndex: () => dispatch(fetchListsIndex()),
  clearErrors: () => dispatch(clearErrors()),
  setUILoading: () => dispatch(setUILoading())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ListsIndex));
