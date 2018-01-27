import * as actions from '../session_actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// import fetchMock from 'fetch-mock';

// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

const user = {
  id: 1,
  points: 12200,
  username: "eHemmingway"
};

describe('receiveCurrentUser', () => {
  it('should create an action to set the current user', () => {
    const expectedAction = {
      type: actions.RECEIVE_CURRENT_USER,
      currentUser: user
    };

    expect(actions.receiveCurrentUser(user)).toEqual(expectedAction);
  });
});

describe('updateUserPoints', () => {
  it('should create an action to update a user\'s points', () => {
    // The reducer will later replace the points value, not increment it
    const expectedAction = {
      type: actions.UPDATE_USER_POINTS,
      points: 1000
    };

    expect(actions.updateUserPoints(1000)).toEqual(expectedAction);
  });
});

describe('async actions', () => {
  // afterEach(() => {
  //   fetchMock.reset();
  //   fetchMock.restore();
  // });

  describe('signup', () => {
    // const successReq = fetchMock
      // .getOnce('')

    it('sends a request to the signup session api', () => {

    });

    describe('when the api request resolves successfully', () => {
      it('dispatches resulting data via receiveCurrentUser', () => {

      });
    });

    describe('when the api request fails', () => {
      it('dispatches resulting error via receiveSessionErrors', () => {

      });
    });
  });
});
