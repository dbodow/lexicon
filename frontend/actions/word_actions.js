import * as WordAPIUtil from '../util/word_api_util';
import { RECEIVE_ERRORS,
         CLEAR_ERRORS,
         receiveErrors,
         clearErrors } from './error_actions';

export const RECEIVE_WORD_DATA = 'RECEIVE_WORD_DATA';

export const receiveWordData = entities => ({
  type: RECEIVE_WORD_DATA,
  entities
});

export const querySingleWord = query => dispatch => (
  WordAPIUtil.querySingleWord(query)
    .then(entities => dispatch(receiveWordData(entities)))
    .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const queryPossibleWords = query => dispatch => (
  WordAPIUtil.queryPossibleWords(query)
    .then()
    .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
);
