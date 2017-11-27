import { RECEIVE_WORD_DATA } from '../actions/word_actions.js';
import { RECEIVE_ENTITIES_ERRORS,
        CLEAR_ERRORS } from '../actions/error_actions';

const _nullErrors = [];

export default (state = _nullErrors, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_ENTITIES_ERRORS:
      return action.errors;
    case RECEIVE_WORD_DATA:
      return _nullErrors;
    case CLEAR_ERRORS:
      return [];
    default:
      return state;
  }
};
