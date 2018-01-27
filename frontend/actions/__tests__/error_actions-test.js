import * as actions from '../error_actions';

const errors = { msg: 'this is a mocked error' };

describe('receiveSessionErrors', () => {
  it('should create an action to set session errors', () => {
    const expectedAction = {
      type: actions.RECEIVE_SESSION_ERRORS,
      errors
    };

    expect(actions.receiveSessionErrors(errors)).toEqual(expectedAction);
  });
});

describe('receiveEntitiesErrors', () => {
  it('should create an action to set entities errors', () => {
    const expectedAction = {
      type: actions.RECEIVE_ENTITIES_ERRORS,
      errors
    };

    expect(actions.receiveEntitiesErrors(errors)).toEqual(expectedAction);
  });
});

describe('receiveUIErrors', () => {
  it('should create an action to set ui errors', () => {
    const expectedAction = {
      type: actions.RECEIVE_UI_ERRORS,
      errors
    };

    expect(actions.receiveUIErrors(errors)).toEqual(expectedAction);
  });
});

describe('clearErrors', () => {
  it('should create an action to clear all errors', () => {
    const expectedAction = {
      type: actions.CLEAR_ERRORS,
    };

    expect(actions.clearErrors()).toEqual(expectedAction);
  });
});
