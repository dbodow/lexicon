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

export const toggleListActiveStatus = listId => (
  $.ajax({
    method: 'patch',
    url: `api/lists/${listId}`
  })
);

export const deleteList = listId => (
  $.ajax({
    method: 'delete',
    url: `api/lists/${listId}`
  })
);
