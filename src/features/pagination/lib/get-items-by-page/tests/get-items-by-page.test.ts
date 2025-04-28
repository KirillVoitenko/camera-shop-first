import { Product } from '@entities/product';
import { getItemsByPage } from '../get-items-by-page';
import { INITIAL_PAGE_PARAMS, MAX_ITEMS_IN_ONE_PAGE } from '@features/pagination/config/const';
import faker from 'faker';
import { generateProductMock } from '@test-utills/mocks/product';

type EachArg = {
  activePage: number;
  itemsCountByPage: number;
}

const PRODUCTS_COUNT = faker.datatype.number({min: 40});

const generateProductsArray = () => Array.from({length: PRODUCTS_COUNT}).map(generateProductMock);

describe('function \'getItemsByPage\'', () => {
  it.each<EachArg>([
    { activePage: INITIAL_PAGE_PARAMS.page, itemsCountByPage: MAX_ITEMS_IN_ONE_PAGE },
    { activePage: faker.datatype.number({ min: INITIAL_PAGE_PARAMS.page + 1 }), itemsCountByPage: faker.datatype.number({ min: MAX_ITEMS_IN_ONE_PAGE + 1 }) },
    { activePage: 0, itemsCountByPage: 0 },
  ])('should correct works by empty products, pageNumber=$activePage, pageItems=$itemsCountByPage',
    ({ activePage, itemsCountByPage }) => {
      const products: Product[] = [];
      const expectedResult: Product[] = [];

      const result = getItemsByPage(products, activePage, itemsCountByPage);

      expect(result).toEqual(expectedResult);
    });

  it.each<EachArg>([
    { activePage: INITIAL_PAGE_PARAMS.page, itemsCountByPage: MAX_ITEMS_IN_ONE_PAGE },
    { activePage: faker.datatype.number({ min: INITIAL_PAGE_PARAMS.page + 1 }), itemsCountByPage: faker.datatype.number({ min: MAX_ITEMS_IN_ONE_PAGE + 1 }) },
    { activePage: 0, itemsCountByPage: 0 },
  ])('should correct works by filled products, pageNumber=$activePage, pageItems=$itemsCountByPage',
    ({ activePage, itemsCountByPage }) => {
      const products = generateProductsArray();
      const lastItemIndex = activePage * itemsCountByPage;
      const firstItemIndex = Math.max(lastItemIndex - itemsCountByPage, 0);
      const expectedResult = products.slice(firstItemIndex, lastItemIndex);

      const result = getItemsByPage(products, activePage, itemsCountByPage);

      expect(result).toEqual(expectedResult);
    });
});
