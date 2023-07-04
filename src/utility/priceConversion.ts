import currency from 'currency.js';

export const tSh = (value: string) => {
  return currency(value, {
    symbol: 'TZS ',
    separator: ',',
    precision: 0,
  }).format();
};
