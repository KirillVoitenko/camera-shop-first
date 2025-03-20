import { getProductTypeDisplayValue } from '../get-product-type-display-value';
import { ProductCategory, ProductType } from '@entities/product/model/types';

describe('Function \'getProductTypeDisplayValue\'', () => {
  it.each([
    {type: ProductType.Collection, name: 'ProductType.Collection', expected: 'Коллекционный'},
    {type: ProductType.Digital, name: 'ProductType.Digital', expected: 'Цифровой'},
    {type: ProductType.Film, name: 'ProductType.Film', expected: 'Плёночный'},
    {type: ProductType.Momental, name: 'ProductType.Digital', expected: 'Моментальный'}
  ])('should correct return by \'ProductCategory.PhotoCamera\' and $name type', ({expected, type}) => {
    const result = getProductTypeDisplayValue(type, ProductCategory.PhotoCamera);

    expect(result).toBe(expected);
  });

  it.each([
    {type: ProductType.Collection, name: 'ProductType.Collection', expected: ProductType.Collection},
    {type: ProductType.Digital, name: 'ProductType.Digital', expected: ProductType.Digital},
    {type: ProductType.Film, name: 'ProductType.Film', expected: ProductType.Film},
    {type: ProductType.Momental, name: 'ProductType.Digital', expected: ProductType.Momental}
  ])('should correct return by \'ProductCategory.VideoCamera\' and $name type', ({expected, type}) => {
    const result = getProductTypeDisplayValue(type, ProductCategory.VideoCamera);

    expect(result).toBe(expected);
  });
});
