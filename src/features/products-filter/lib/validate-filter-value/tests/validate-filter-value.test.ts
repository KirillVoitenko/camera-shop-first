import { validateFilterValue } from '../validate-filter-value';
import { INITIAL_FILTER } from '@features/products-filter/config/const';
import { adaptFormValueToFilterValue } from '../../form-value-adapter';
import { FilterValue } from '@features/products-filter/model/types';
import { PriceLimit } from '@entities/product';
import faker from 'faker';
import { DefaultPriceValues } from '@features/products-filter/config/const';

type ValidationResult = ReturnType<typeof validateFilterValue>;

describe('function \'validateFilterValue\'', () => {
  let filterValue: FilterValue;
  let priceLimits: PriceLimit;

  beforeEach(() => {
    filterValue = adaptFormValueToFilterValue({ ...INITIAL_FILTER });
    priceLimits = {
      max: null,
      min: null,
    };
  });

  it('should correct return by initial filter', () => {
    const expectedResult: ValidationResult = {
      isValid: true
    };

    const result = validateFilterValue(filterValue, priceLimits);

    expect(result).toEqual(expectedResult);
  });

  it('should correct return by valid filter value', () => {
    filterValue.priceBegin = faker.datatype.number({min: DefaultPriceValues.priceBegin, max: DefaultPriceValues.priceEnd / 2});
    filterValue.priceEnd = faker.datatype.number({min: filterValue.priceBegin, max: DefaultPriceValues.priceEnd});
    const expectedResult: ValidationResult = {
      isValid: true
    };

    const result = validateFilterValue(filterValue, priceLimits);

    expect(result).toEqual(expectedResult);
  });

  it('should correct return by not valid price range filter value', () => {
    filterValue.priceEnd = faker.datatype.number({min: DefaultPriceValues.priceBegin, max: DefaultPriceValues.priceEnd / 2});
    filterValue.priceBegin = faker.datatype.number({min: filterValue.priceEnd, max: DefaultPriceValues.priceEnd});
    const expectedResult: ValidationResult = {
      isValid: false,
      errors: {
        priceBegin: {
          message: `Максимальное значение ${filterValue.priceEnd}`
        },
        priceEnd: {
          message: `Минимальное значение ${filterValue.priceBegin}`
        }
      }
    };

    const result = validateFilterValue(filterValue, priceLimits);

    expect(result).toEqual(expectedResult);
  });

  it('should correct return by not valid price range filter value by price limits', () => {
    filterValue.priceEnd = faker.datatype.number({min: DefaultPriceValues.priceBegin, max: DefaultPriceValues.priceEnd / 2});
    filterValue.priceBegin = faker.datatype.number({min: filterValue.priceEnd, max: DefaultPriceValues.priceEnd});
    priceLimits.max = filterValue.priceEnd - 1;
    priceLimits.min = filterValue.priceBegin - 1;
    const expectedResult: ValidationResult = {
      isValid: false,
      errors: {
        priceBegin: {
          message: `Максимальное значение ${filterValue.priceEnd}`
        },
        priceEnd: {
          message: `Минимальное значение ${filterValue.priceBegin}`
        }
      }
    };

    const result = validateFilterValue(filterValue, priceLimits);

    expect(result).toEqual(expectedResult);
  });
});
