import { RECEIVE_ERRORS,
         RECEIVE_CURRENT_USER,
         CLEAR_ERRORS } from '../actions/session_actions.js';

const _nullErrors = [];

export default (state = _nullErrors, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
      return _nullErrors;
    case CLEAR_ERRORS:
      return [];
    default:
      return state;
  }
};
