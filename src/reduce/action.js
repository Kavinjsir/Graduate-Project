export const fetchList = emails => {
  return {
    type: 'FETCH',
    emails
  };
};

export const setRead = id => {
  return {
    type: 'SETREAD',
    id
  };
};

export const setDelete = id => {
  return {
    type: 'DELETE',
    id
  };
};