import { Product } from '@entities/product/model/types';
import { isEqualsProductsArray } from '../compare-products';
import faker from 'faker';
import { generateProductMock } from '@test-utills/mocks/product';

const PRODUCTS_COUNT = faker.datatype.number(40);

type EachArg = {
  firstProductsArray: Product[];
  secondProductsArray: Product[];
  expectedResult: boolean;
}

const generateProductsArray = (productsCount = PRODUCTS_COUNT): Product[] => Array.from({length: productsCount}).map(generateProductMock);

const FIRST_PRODUCTS_MOCK = generateProductsArray();
const SECOND_PRODUCTS_MOCK = generateProductsArray();

describe('function \'isEqualsProductsArray\'', () => {
  it.each<EachArg>([
    {expectedResult: false, firstProductsArray: FIRST_PRODUCTS_MOCK, secondProductsArray: SECOND_PRODUCTS_MOCK},
    {expectedResult: true, firstProductsArray: FIRST_PRODUCTS_MOCK, secondProductsArray: FIRST_PRODUCTS_MOCK}
  ])('should return $expectedResult by mocked products', ({expectedResult, firstProductsArray, secondProductsArray}) => {
    const result = isEqualsProductsArray(firstProductsArray, secondProductsArray);

    expect(result).toBe(expectedResult);
  });
});
