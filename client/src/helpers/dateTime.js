export const timeHelper = (dateTime) => {
  const date = new Date(dateTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  console.log("minutes", minutes)
  console.log("datetime", dateTime)
  if (hours < 12) {
    return `${hours}:${minutes < 10 ? `0${minutes}`: minutes} AM`;
  } else {
    return `${hours - 12}:${minutes < 10 ? `0${minutes}`: minutes} PM`;
  }
};

export const dateHelper = (dateTime) => {
  const date = new Date(dateTime);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

