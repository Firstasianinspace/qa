export const convertISODateToString = (isoDate: string) => {
  const d = new Date(isoDate);
  return d.toLocaleDateString("en-GB");
};

export const compareDateTimeOnOneOrder = (dateOne: string, dateTwo: string) => {
  const firstDate = new Date(dateOne).valueOf();
  const secondDate = new Date(dateTwo).valueOf();
  return firstDate - secondDate < 11;
};
