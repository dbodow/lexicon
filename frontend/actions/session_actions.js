import * as SessionAPIUtil from '../util/session_api_util';
import { receiveSessionErrors } from './error_actions';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const UPDATE_USER_POINTS = 'UPDATE_USER_POINTS';

export const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const updateUserPoints = points => ({
  type: UPDATE_USER_POINTS,
  points
});

export const signup = formUser => dispatch => (
  SessionAPIUtil.signup(formUser)
    .then(user => dispatch(receiveCurrentUser(user)))
    .fail(errors => dispatch(receiveSessionErrors(errors.responseJSON)))
);

export const login = formUser => dispatch => (
  SessionAPIUtil.login(formUser)
    .then(user => dispatch(receiveCurrentUser(user)))
    .fail(errors => dispatch(receiveSessionErrors(errors.responseJSON)))
);

export const logout = () => dispatch => (
  SessionAPIUtil.logout()
    .then(() => dispatch(receiveCurrentUser(null)))
);
