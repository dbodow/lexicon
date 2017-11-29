import * as ListAPIUtil from '../util/list_api_util';
import { receiveEntitiesErrors } from './error_actions';
import { setUILoading, clearUILoading } from './ui_actions';

export const RECEIVE_LIST_SHOW = 'RECEIVE_LIST_SHOW';
export const RECEIVE_LISTS_INDEX = 'RECEIVE_LISTS_INDEX';

export const receiveListShow = entities => ({
  type: RECEIVE_LIST_SHOW,
  entities
});

export const receiveListsIndex = entities => ({
  type: RECEIVE_LISTS_INDEX,
  entities
});

export const createList = list => dispatch => {
  dispatch(setUILoading());
  return ( ListAPIUtil.createList(list)
    .then(entities => dispatch(receiveListShow(entities)))
    .fail(errors => dispatch(receiveEntitiesErrors(errors.responseJSON)))
    .always(() => dispatch(clearUILoading()))
  );
};

export const fetchListShow = id => dispatch => {
  dispatch(setUILoading());
  return ( ListAPIUtil.fetchList(id)
    .then(entities => dispatch(receiveListShow(entities)))
    .fail(errors => dispatch(receiveEntitiesErrors(errors.responseJSON)))
    .always(() => dispatch(clearUILoading()))
  );
};

export const fetchListsIndex = () => dispatch => {
  dispatch(setUILoading());
  return ( ListAPIUtil.fetchCurrentUserLists()
    .then(results => dispatch(receiveListsIndex(results)))
    .fail(errors => dispatch(receiveEntitiesErrors(errors.responseJSON)))
    .always(() => dispatch(clearUILoading()))
  );
};
