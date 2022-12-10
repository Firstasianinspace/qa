export const formatPrice = (value) => {
  const fixedValue = value && Number(value).toFixed(2);

  return fixedValue
    ? fixedValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")
    : fixedValue;
  // пример, на выходе: "1 091.21"
};

export const calculateDiscountPercentage = ({ current, previous }) => {
  const percent = previous / 100;
  const priceInPercentage = Math.round(current / percent);
  return Math.ceil(100 - priceInPercentage);
};
