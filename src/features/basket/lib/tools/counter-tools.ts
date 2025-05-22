import { CounterRange } from '@features/basket/config/const';

export const getCorrectItemsCountByRange = (value: number, min: number = CounterRange.Min, max: number = CounterRange.Max) => {
  if (value < min) {
    return min;
  } else if (value > max) {
    return max;
  }

  return value;
};
