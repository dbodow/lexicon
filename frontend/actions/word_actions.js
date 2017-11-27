import * as WordAPIUtil from '../util/word_api_util';
import { receiveEntitiesErrors } from './error_actions';

export const RECEIVE_WORD_DATA = 'RECEIVE_WORD_DATA';
export const RECEIVE_SEARCH_DATA = 'RECEIVE_SEARCH_DATA';

export const receiveWordData = entities => ({
  type: RECEIVE_WORD_DATA,
  entities
});

export const receiveSearchData = results => ({
  type: RECEIVE_SEARCH_DATA,
  results
})

export const querySingleWord = query => dispatch => (
  WordAPIUtil.querySingleWord(query)
    .then(entities => dispatch(receiveWordData(entities)))
    .fail(errors => dispatch(receiveEntitiesErrors(errors.responseJSON)))
);

export const queryPossibleWords = query => dispatch => (
  WordAPIUtil.queryPossibleWords(query)
    .then(results => dispatch(receiveSearchData(results)))
    .fail(errors => dispatch(receiveEntitiesErrors(errors.responseJSON)))
);
