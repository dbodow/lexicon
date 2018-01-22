import NewList from './new_list';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createList } from '../../actions/list_actions';
import { clearErrors, receiveUIErrors } from '../../actions/error_actions';
import { setUILoading, clearPrefill } from '../../actions/ui_actions';
import { clearEntities } from '../../actions/entities_actions';

const mapStateToProps = state => ({
  entities: state.entities,
  errors: state.errors,
  ui: state.ui
});

const mapDispatchToProps = dispatch => ({
  createList: list => dispatch(createList(list)),
  receiveUIErrors: errors => dispatch(receiveUIErrors(errors)),
  clearEntities: () => dispatch(clearEntities()),
  clearErrors: () => dispatch(clearErrors()),
  setUILoading: () => dispatch(setUILoading()),
  clearPrefill: () => dispatch(clearPrefill())
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NewList));
