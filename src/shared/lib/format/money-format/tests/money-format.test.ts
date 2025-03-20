import { moneyFormat } from '../money-format';


describe('Formatter \'moneyFormat\'', () => {
  it('should correct formating \'value\' argument', () => {
    const numberValue = 1000000;
    const expected = `1${String.fromCharCode(160)}000${String.fromCharCode(160)}000${String.fromCharCode(160)}₽`;

    expect(moneyFormat(numberValue)).toBe(expected);
  });
});
