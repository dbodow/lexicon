import * as actions from '../ui_actions';

describe('setUILoading', () => {
  it('should create an action to set the ui state to \'loading\'', () => {
    const expectedAction = {
      type: actions.SET_UI_LOADING
    };
    expect(actions.setUILoading()).toEqual(expectedAction);
  });
});
