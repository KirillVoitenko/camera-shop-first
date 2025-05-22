import { getCorrectItemsCountByRange } from '../counter-tools';
import faker from 'faker';

const MIN_COUNTER = faker.datatype.number();
const MAX_COUNTER = faker.datatype.number({min: MIN_COUNTER + 1});

describe('counter tools', () => {
  describe('function \'getCorrectItemsCountByRange\'', () => {
    it('should return correct value if argument < minimal', () => {
      const valueArg = faker.datatype.number({max: MIN_COUNTER - 1});

      const result = getCorrectItemsCountByRange(valueArg, MIN_COUNTER, MAX_COUNTER);

      expect(result).toBe(MIN_COUNTER);
    });

    it('should return correct value if argument > maximal', () => {
      const valueArg = faker.datatype.number({min: MAX_COUNTER + 1});

      const result = getCorrectItemsCountByRange(valueArg, MIN_COUNTER, MAX_COUNTER);

      expect(result).toBe(MAX_COUNTER);
    });

    it('should return correct value if argument in range', () => {
      const valueArg = faker.datatype.number({min: MIN_COUNTER, max: MAX_COUNTER});

      const result = getCorrectItemsCountByRange(valueArg, MIN_COUNTER, MAX_COUNTER);

      expect(result).toBe(valueArg);
    });
  });
});
