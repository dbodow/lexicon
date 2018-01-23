import { SET_UI_LOADING,
         CLEAR_UI_LOADING,
         PREFILL_LIST,
         CLEAR_PREFILL } from '../actions/ui_actions';
import merge from 'lodash/merge';

const loadingState = { loading: true };
const notLoadingState = { loading: false };
const notPrefilledState = {
  prefill: {
    list: {
      title: '',
      description: '',
      words: ''
    }
  }
};

const _nullState = merge(notLoadingState, notPrefilledState);

export default (state=_nullState, action) => {
  const newState = merge ({}, state);
  switch (action.type) {
    case SET_UI_LOADING:
      newState.loading = true;
      return newState;
    case CLEAR_UI_LOADING:
      newState.loading = false;
      return newState;
    case PREFILL_LIST:
      newState.prefill = action.prefill;
      return newState;
    case CLEAR_PREFILL:
      newState.prefill = notPrefilledState.prefill;
      return newState;
    default:
      return state;
  }
};
