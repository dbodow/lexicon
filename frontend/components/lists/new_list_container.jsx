import NewList from './new_list';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createList } from '../../actions/list_actions';
import { clearErrors } from '../../actions/error_actions';
import { setUILoading } from '../../actions/ui_actions';

const mapStateToProps = state => ({
  entities: state.entities,
  errors: state.errors,
  ui: state.ui
});

const mapDispatchToProps = dispatch => ({
  createList: () => dispatch(createList()),
  clearErrors: () => dispatch(clearErrors()),
  setUILoading: () => dispatch(setUILoading())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NewList));
