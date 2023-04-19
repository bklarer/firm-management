export const timeHelper = (dateTime) => {
  const date = new Date(dateTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  if (hours < 12) {
    return `${hours}:${minutes} AM`;
  } else {
    return `${hours - 12}:${minutes} PM`;
  }
};

export const dateHelper = (dateTime) => {
  const date = new Date(dateTime);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};
