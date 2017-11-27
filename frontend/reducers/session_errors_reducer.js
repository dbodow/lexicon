import { RECEIVE_CURRENT_USER } from '../actions/session_actions.js';
import { RECEIVE_SESSION_ERRORS,
        CLEAR_ERRORS } from '../actions/error_actions';

const _nullErrors = [];

export default (state = _nullErrors, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
      return _nullErrors;
    case CLEAR_ERRORS:
      return [];
    default:
      return state;
  }
};
