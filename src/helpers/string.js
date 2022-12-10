export const plural = (number, one, two, five) => {
  if (number === 0) return `0 ${five}`;
  // plural(10, 'носок', 'носка', 'носков') --> '10 носков'
  let n = Math.abs(number);

  n %= 100;
  if (n >= 5 && n <= 20) {
    return `${number} ${five}`;
  }

  n %= 10;
  if (n === 1) {
    return `${number} ${one}`;
  }

  if (n >= 2 && n <= 4) {
    return `${number} ${two}`;
  }

  return `${number} ${five}`;
};

export const getPluralStores = (count) =>
  plural(count, "аптеке", "аптеках", "аптеках");

export const pluralProducts = (number) =>
  plural(number, "товар", "товара", "товаров");

export const pluralStores = (number) =>
  plural(number, "аптека", "аптеки", "аптек");

export const pluralDays = (number) => plural(number, "день", "дня", "дней");

export const pluralMonths = (number) =>
  plural(number, "месяц", "месяца", "месяцев");

export const pluralYears = (number) => plural(number, "год", "года", "лет");
