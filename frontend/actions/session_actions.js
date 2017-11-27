import * as SessionAPIUtil from '../util/session_api_util';
import { receiveSessionErrors } from './error_actions';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';

export const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
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
