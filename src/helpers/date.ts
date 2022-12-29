export const convertISODateToString = (isoDate: string) => {
  const d = new Date(isoDate);
  return d.toLocaleDateString("en-GB");
};

const isNegativeNumber = (num: number) => {
  if (Math.sign(num) === -1) {
    return true;
  }
  return false;
};

export const compareDateTimeOnOneOrder = (dateOne: string, dateTwo: string) => {
  const firstDate = new Date(dateOne).valueOf();
  const secondDate = new Date(dateTwo).valueOf();
  const difference = secondDate - firstDate;
  return difference < 4 * 60 * 1000;
};
