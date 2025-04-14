import { Product } from '@entities/product';
import { sortProducts } from '../sorting-functions';
import type {
  ProductsSortingValue,
  SortType,
  SortVector
} from '@features/products-sorting/model/types';
import faker from 'faker';
import { generateProductMock } from '@test-utills/mocks/product';

type EachArg = {
  sourceProducts: Product[];
  sortingValue: ProductsSortingValue;
  expectedProducts: Product[];
  caseName: string;
}

const createSortingValue = (type: SortType, vector: SortVector): ProductsSortingValue => ({
  type,
  vector
});

const PRODUCTS_MOCK = Array.from({length: faker.datatype.number({min: 1, max: 20})}).map(generateProductMock);
const PRICE_UP_SORTED_PRODUCTS = [...PRODUCTS_MOCK].sort((first, second) => first.price - second.price);
const PRICE_DOWN_SORTED_PRODUCTS = [...PRODUCTS_MOCK].sort((first, second) => second.price - first.price);
const RATING_UP_SORTED_PRODUCTS = [...PRODUCTS_MOCK].sort((first, second) => first.rating - second.rating);
const RATING_DOWN_SORTED_PRODUCTS = [...PRODUCTS_MOCK].sort((first, second) => second.rating - first.rating);


describe('Product sorting function', () => {
  it.each<EachArg>([
    { sourceProducts: PRODUCTS_MOCK, sortingValue: createSortingValue('PRICE', 'UP'), expectedProducts: PRICE_UP_SORTED_PRODUCTS, caseName: 'price up sorting' },
    { sourceProducts: PRODUCTS_MOCK, sortingValue: createSortingValue('PRICE', 'DOWN'), expectedProducts: PRICE_DOWN_SORTED_PRODUCTS, caseName: 'price down sorting' },
    { sourceProducts: PRODUCTS_MOCK, sortingValue: createSortingValue('POPULAR', 'UP'), expectedProducts: RATING_UP_SORTED_PRODUCTS, caseName: 'rating up sorting' },
    { sourceProducts: PRODUCTS_MOCK, sortingValue: createSortingValue('POPULAR', 'DOWN'), expectedProducts: RATING_DOWN_SORTED_PRODUCTS, caseName: 'rating down sorting' },
  ])('should correct sort by $caseName', ({ sourceProducts, sortingValue, expectedProducts }) => {
    const result = sortProducts(sourceProducts, sortingValue);

    expect(result).toEqual(expectedProducts);
  });
});
