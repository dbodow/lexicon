import { RECEIVE_CURRENT_USER,
         UPDATE_USER_POINTS } from '../actions/session_actions';

import merge from 'lodash/merge';

const _nullUser = {
  currentUser: null
};

export default (state = _nullUser, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      return merge({}, { currentUser: action.currentUser });
    case UPDATE_USER_POINTS:
      return merge({}, state.currentUser, {
        currentUser: {
          id: state.currentUser.id,
          username: state.currentUser.username,
          points: action.points
        }
      });
    default:
      return state;
  }
};
