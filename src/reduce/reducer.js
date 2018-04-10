export function updateState(state = [], action) {
  const mails = [...state];
  switch (action.type) {
    case 'FETCH':
      const emails = action.emails.sort((a, b) => {
        return (new Date(b.time)) - (new Date(a.time));
      })
      let id = 0;
      for (const mail of emails) {
        mail.id = id++;
      }
      return emails;
    case 'SETREAD':
      mails.find(x => x.id === action.id).read = 'true';
      return mails;
    case 'DELETE':
      mails.find(x => x.id === action.id).tag = 'deleted';
      return mails;
    default:
      return state;
  }
}