const intFormatter = (fractionDigits = 0) => new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  currencyDisplay: 'symbol',

  maximumFractionDigits: fractionDigits,
  minimumFractionDigits: fractionDigits,
});

export const moneyFormat = (value: number): string => {
  const fractionDigits = Number.isInteger(value) ? 0 : 2;
  const formatter = intFormatter(fractionDigits);
  return formatter.format(value);
};
