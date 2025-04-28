import { mergeSearchParams, isEqualsParamsObjects } from '../utills';
import faker from 'faker';

const generateSearchParamSource = (paramIndex: number): [string, string] => [
  `${faker.lorem.word()}${paramIndex}`,
  faker.lorem.word()
];

const generateSearchParamsInit = (count: number) => Array.from({ length: count }).map((_, index) => generateSearchParamSource(index));

const FAKE_PARAMS_LIB = generateSearchParamsInit(10);

type EachArg = {
  source: URLSearchParams;
  merged: URLSearchParams;
  expectedResult: URLSearchParams;
  sourceCount: number;
  mergedCount: number;
};

type EqualsTestObject = {
  field1: string;
  field2: number;
}

const generateEqualsTestObject = (index: number): EqualsTestObject => ({
  field1: `${faker.datatype.string()}${index}`,
  field2: faker.datatype.number(),
});

describe('search params utills functions', () => {
  describe('function \'mergeSearchParams\'', () => {
    it.each<EachArg>([
      {
        source: new URLSearchParams(generateSearchParamsInit(0)),
        merged: new URLSearchParams(FAKE_PARAMS_LIB.slice(0, 2)),
        expectedResult: new URLSearchParams(FAKE_PARAMS_LIB.slice(0, 2)),
        mergedCount: 0,
        sourceCount: 3,
      },
      {
        source: new URLSearchParams(FAKE_PARAMS_LIB.slice(0, 2)),
        merged: new URLSearchParams(generateSearchParamsInit(0)),
        expectedResult: new URLSearchParams(FAKE_PARAMS_LIB.slice(0, 2)),
        mergedCount: 3,
        sourceCount: 0,
      },
      {
        source: new URLSearchParams(FAKE_PARAMS_LIB.slice(0, 2)),
        merged: new URLSearchParams(FAKE_PARAMS_LIB.slice(2, 4)),
        expectedResult: new URLSearchParams(FAKE_PARAMS_LIB.slice(0, 4)),
        mergedCount: 3,
        sourceCount: 3,
      }
    ])('should correct merge by source params count=$sourceCount and merged params count=$mergedCount',
      ({ expectedResult, source, merged }) => {
        const result = mergeSearchParams(source, merged);

        expect(result).toEqual(expectedResult);
      });

    it('should correct merge params by equals param name', () => {
      const paramName = faker.lorem.word();
      const sourceParamValue = faker.lorem.word();
      const mergedParamValue = faker.lorem.word();
      const additionalSourceParams = generateSearchParamsInit(3);
      const sourceParams = new URLSearchParams([[paramName, sourceParamValue], ...additionalSourceParams]);
      const mergedParams = new URLSearchParams([[paramName, mergedParamValue]]);
      const expectedResult = new URLSearchParams([[paramName, mergedParamValue], ...additionalSourceParams]);

      const result = mergeSearchParams(sourceParams, mergedParams);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('function \'isEqualsParamsObjects\'', () => {
    it('should correct compare empty objects', () => {
      const firstObject = {};
      const secondObject = {};

      const result = isEqualsParamsObjects(firstObject, secondObject);

      expect(result).toBeTruthy();
    });

    it('should correct compare not equals objects', () => {
      const firstObject = generateEqualsTestObject(0);
      const secondObject = generateEqualsTestObject(1);

      const result = isEqualsParamsObjects(firstObject, secondObject);

      expect(result).toBeFalsy();
    });

    it('should correct compare equals objects', () => {
      const firstObject = generateEqualsTestObject(0);
      const secondObject = {...firstObject };

      const result = isEqualsParamsObjects(firstObject, secondObject);

      expect(result).toBeTruthy();
    });
  });
});
