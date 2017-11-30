export const fetchQuizQuestion = isLastQuestionCorrect => (
  $.ajax({
    method: 'post',
    url: 'api/quizzes/',
    data: {
      correct: isLastQuestionCorrect
    }
  })
);
