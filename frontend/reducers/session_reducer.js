import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

import merge from 'lodash/merge';

const _nullUser = {
  currentUser: null
};

export default (state = _nullUser, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, { currentUser: action.currentUser });
    default:
      return state;
  }
};
