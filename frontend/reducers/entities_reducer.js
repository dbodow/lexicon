import { RECEIVE_WORD_DATA,
         RECEIVE_SEARCH_DATA } from '../actions/word_actions';
import { RECEIVE_LIST_SHOW,
         RECEIVE_LISTS_INDEX } from '../actions/list_actions';
import { RECEIVE_QUIZ_DATA } from '../actions/quiz_actions';
import { RECEIVE_ENTITIES_ERRORS } from '../actions/error_actions';
import { CLEAR_ENTITIES } from '../actions/entities_actions';

import merge from 'lodash/merge';

const _nullEntities = {
  words: {},
  examples: {},
  definitions: {},
  lists: {},
  search: []
};

export default (state = _nullEntities, action) => {
  Object.freeze(state);
  let oldState;
  switch(action.type) {
    case CLEAR_ENTITIES:
      return _nullEntities;
    case RECEIVE_WORD_DATA:
      return merge({}, _nullEntities, action.entities);
    case RECEIVE_SEARCH_DATA:
      return merge({}, _nullEntities, {search: action.results});
    case RECEIVE_LISTS_INDEX:
      return merge({}, _nullEntities, action.entities);
    case RECEIVE_LIST_SHOW:
      return merge({}, _nullEntities, action.entities);
    case RECEIVE_QUIZ_DATA:
      return merge({}, _nullEntities, action.entities);
    case RECEIVE_ENTITIES_ERRORS:
      oldState = merge({}, state);
      delete oldState.search;
      return merge(oldState , {search: []});
    default:
      return state;
  }
};
