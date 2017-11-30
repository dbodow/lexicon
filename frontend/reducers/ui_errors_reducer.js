import { RECEIVE_UI_ERRORS,
        CLEAR_ERRORS } from '../actions/error_actions';

const _nullErrors = [];

export default (state = _nullErrors, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_UI_ERRORS:
      return Object.assign([], action.errors);
    case CLEAR_ERRORS:
      return [];
    default:
      return state;
  }
};
