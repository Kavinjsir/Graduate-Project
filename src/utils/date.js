export const getPrettyDate = date => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'
  ];
  date = date.split(' ')[0];
  const newDate = date.split('-');
  const month = months[0];
  return `${month} ${newDate[2]}, ${newDate[0]}`;
};

export const getPrettyTime = date => {
  const time = date.split(' ')[1].split(':');
  return `${time[0]}:${time[1]}`;
};