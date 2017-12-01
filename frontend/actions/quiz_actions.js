import * as QuizAPIUtil from '../util/quiz_api_util';
import { receiveEntitiesErrors } from './error_actions';
import { setUILoading, clearUILoading } from './ui_actions';
import { updateUserPoints } from './session_actions';

export const RECEIVE_QUIZ_DATA = 'RECEIVE_QUIZ_DATA';

export const receiveQuizData = entities => ({
  type: RECEIVE_QUIZ_DATA,
  entities
});

export const receiveQuizQuestion = (response, dispatch) => {
  dispatch(receiveQuizData(response.entities));
  dispatch(updateUserPoints(response.session.currentUser.points));
};

export const fetchQuizQuestion = isLastQuestionCorrect => dispatch => {
  dispatch(setUILoading());
  return ( QuizAPIUtil.fetchQuizQuestion(isLastQuestionCorrect)
    .then(response => receiveQuizQuestion(response, dispatch))
    .fail(errors => dispatch(receiveEntitiesErrors(errors.responseJSON)))
    .always(() => dispatch(clearUILoading()))
  );
};
