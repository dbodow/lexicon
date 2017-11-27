import { RECEIVE_WORD_DATA,
         RECEIVE_SEARCH_DATA } from '../actions/word_actions';
import { RECEIVE_ENTITIES_ERRORS } from '../actions/error_actions';

import merge from 'lodash/merge';

const _nullEntities = {
  words: {},
  examples: {},
  definitions: {},
  search: []
};

export default (state = _nullEntities, action) => {
  Object.freeze(state);
  let oldState;
  switch(action.type) {
    case RECEIVE_WORD_DATA:
      return merge({}, _nullEntities, action.entities);
    case RECEIVE_SEARCH_DATA:
      // oldState = merge({}, state);
      // delete oldState.search;
      // return merge(oldState , {search: action.results});
      return merge({}, _nullEntities, {search: action.results});
    case RECEIVE_ENTITIES_ERRORS:
      oldState = merge({}, state);
      delete oldState.search;
      return merge(oldState , {search: []});
    default:
      return state;
  }
};
