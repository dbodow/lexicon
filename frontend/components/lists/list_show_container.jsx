import ListShow from './list_show';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchListShow,
         toggleListActiveStatus,
         deleteList } from '../../actions/list_actions';
import { clearErrors } from '../../actions/error_actions';
import { setUILoading } from '../../actions/ui_actions';

const mapStateToProps = state => ({
  words: state.entities.words,
  lists: state.entities.lists,
  definitions: state.entities.definitions,
  examples: state.entities.examples,
  errors: state.errors,
  ui: state.ui
});

const mapDispatchToProps = dispatch => ({
  fetchListShow: id => dispatch(fetchListShow(id)),
  toggleListActiveStatus: id => dispatch(toggleListActiveStatus(id)),
  deleteList: id => dispatch(deleteList(id)),
  clearErrors: () => dispatch(clearErrors()),
  setUILoading: () => dispatch(setUILoading())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(ListShow));
