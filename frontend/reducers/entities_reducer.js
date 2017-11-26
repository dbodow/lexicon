import { RECEIVE_WORD_DATA } from '../actions/word_actions';

import merge from 'lodash/merge';

const _nullEntities = {
  words: {},
  examples: {},
  definitions: {}
};

export default (state = _nullEntities, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_WORD_DATA:
      return merge({}, action.entities);
    default:
      return state;
  }
};
