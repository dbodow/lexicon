export const createList = list => (
  $.ajax({
    method: 'post',
    url: 'api/lists/',
    data: {
      list
    }
  })
);

export const fetchCurrentUserLists = () => (
  $.ajax({
    method: 'get',
    url: 'api/lists/'
  })
);

export const fetchList = listId => (
  $.ajax({
    method: 'get',
    url: `api/lists/${listId}`
  })
);
