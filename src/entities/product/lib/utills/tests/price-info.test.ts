import { Product } from '@entities/product/model/types';
import { getPriceLimitsByProducts, PriceLimit } from '../price-info';
import { generateProductMock } from '@test-utills/mocks/product';
import faker from 'faker';

type EachArg = {
  products: Product[];
  expectedResult: PriceLimit;
  caseName: string;
}

const generateEachCase = (caseName: string, productsCount = 0): EachArg => {
  if (productsCount === 0) {
    return {
      expectedResult: {
        max: null,
        min: null,
      },
      products: [],
      caseName
    };
  }

  const productsMock = Array.from({length: productsCount}).map(generateProductMock);

  const productPrices = productsMock.map((current) => current.price);

  return {
    expectedResult: {
      max: Math.max(...productPrices),
      min: Math.min(...productPrices),
    },
    products: productsMock,
    caseName
  };
};

describe('function \'getPriceLimitsByProducts\'', () => {
  it.each<EachArg>([
    {...generateEachCase('empty', 0)},
    {...generateEachCase('exists', faker.datatype.number({min: 1, max: 20}))}
  ])('should return correct limits with products is $caseName', ({expectedResult, products}) => {
    const result = getPriceLimitsByProducts(products);

    expect(result).toEqual(expectedResult);
  });
});
