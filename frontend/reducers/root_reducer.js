import { combineReducers } from 'redux';
import errors from './errors_reducer';
import session from './session_reducer';

export default combineReducers({
  errors,
  session
});
