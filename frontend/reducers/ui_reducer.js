import { SET_UI_LOADING, CLEAR_UI_LOADING } from '../actions/ui_actions';

const loadingState = { loading: true };
const notLoadingState = { loading: false };

export default (state=notLoadingState, action) => {
  switch (action.type) {
    case SET_UI_LOADING:
      return loadingState;
    case CLEAR_UI_LOADING:
      return notLoadingState;
    default:
      return state;
  }
};
