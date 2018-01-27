export const SET_UI_LOADING = 'SET_UI_LOADING';
export const CLEAR_UI_LOADING = 'CLEAR_UI_LOADING';
export const PREFILL_LIST = 'PREFILL_LIST';
export const CLEAR_PREFILL = 'CLEAR_PREFILL';

export const setUILoading = () => ({
  type: SET_UI_LOADING
});

export const clearUILoading = () => ({
  type: CLEAR_UI_LOADING
});

export const setPrefilledList = ({title, description, words}) => ({
  type: PREFILL_LIST,
  prefill: {
    list: {
      title,
      description,
      words
    }
  }
});

export const clearPrefill = () => ({
  type: CLEAR_PREFILL
});
