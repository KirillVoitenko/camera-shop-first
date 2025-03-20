const intFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  currencyDisplay: 'symbol',

  maximumFractionDigits: 2,
  minimumFractionDigits: 0
});

export const moneyFormat = (value: number): string => intFormatter.format(value);
