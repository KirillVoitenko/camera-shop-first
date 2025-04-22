import { FilterFormValue, FilterValue } from '@features/products-filter/model/types';
import { adaptFormValueToFilterValue } from '../form-value-adapter';
import { INITIAL_FILTER } from '@features/products-filter/config/const';
import { ProductCategory } from '@entities/product';

describe('function \'adaptFormValueToFilterValue\'', () => {
  it('should correct return by initial filter value', () => {
    const expectedValue: FilterValue = {
      category: null,
      hasAmateurLevel: false,
      hasBeginnerLevel: false,
      hasCollectionType: false,
      hasDigitalType: false,
      hasFilmType: false,
      hasMomentalType: false,
      hasProfessionalLevel: false,
      priceBegin: null,
      priceEnd: null,
    };

    const result = adaptFormValueToFilterValue(INITIAL_FILTER);

    expect(result).toEqual(expectedValue);
  });

  it('should correct return by custom filter value', () => {
    const filterValue: FilterFormValue = {
      category: ProductCategory.PhotoCamera,
      hasAmateurLevel: false,
      hasBeginnerLevel: false,
      hasCollectionType: true,
      hasDigitalType: false,
      hasFilmType: false,
      hasMomentalType: true,
      hasProfessionalLevel: false,
      priceBegin: '123',
      priceEnd: '321',
    };

    const expectedValue: FilterValue = {
      category: ProductCategory.PhotoCamera,
      hasAmateurLevel: false,
      hasBeginnerLevel: false,
      hasCollectionType: true,
      hasDigitalType: false,
      hasFilmType: false,
      hasMomentalType: true,
      hasProfessionalLevel: false,
      priceBegin: 123,
      priceEnd: 321,
    };

    const result = adaptFormValueToFilterValue(filterValue);

    expect(result).toEqual(expectedValue);
  });
});
