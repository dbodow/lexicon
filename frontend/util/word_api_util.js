export const querySingleWord = query => (
  $.ajax({
    method: 'get',
    url: `api/words/${query}`
  })
);

export const queryPossibleWords = query => (
  $.ajax({
    method: 'get',
    url: `api/words?query=${query}`
  })
);
