import * as actions from '../ui_actions';

describe('setUILoading', () => {
  it('should create an action to set the ui \'loading\' state', () => {
    const expectedAction = {
      type: actions.SET_UI_LOADING
    };
    expect(actions.setUILoading()).toEqual(expectedAction);
  });
});

describe('clearUILoading', () => {
  it('should create an action to clear the ui \'loading\' state', () => {
    const expectedAction = {
      type: actions.CLEAR_UI_LOADING
    };
    expect(actions.clearUILoading()).toEqual(expectedAction);
  });
});

describe('setPrefilledList', () => {
  const list = {
    title: 'my list',
    description: 'a mocked list',
    words: 'a string of words'
  };

  it('should create an action to prefill a list', () => {
    const expectedAction = {
      type: actions.PREFILL_LIST,
      prefill: { list }
    };
    expect(actions.setPrefilledList(list)).toEqual(expectedAction);
  });
});

describe('clearPrefill', () => {
  it('should create an action to clear the prefill state', () => {
    const expectedAction = {
      type: actions.CLEAR_PREFILL
    };
    expect(actions.clearPrefill()).toEqual(expectedAction);
  });
});
