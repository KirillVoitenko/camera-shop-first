import { BasketItemShort } from '@features/basket/model/types';
import { basketStorage } from '../basket-storage';
import { LocalStorageMock } from '@test-utills/mocks/system-modules';
import faker from 'faker';
import { BASKET_STORAGE_KEY } from '@features/basket/config/const';

const generateBasketItem = (): BasketItemShort => ({
  count: faker.datatype.number(),
  productId: faker.datatype.number()
});

describe('basket storage', () => {
  const localStorageMock = new LocalStorageMock({});
  const basketMock = Array.from({length: faker.datatype.number()}).map(generateBasketItem);

  beforeAll(() => {
    window.localStorage = localStorageMock;
  });

  beforeEach(() => {
    localStorageMock.clear();
  });

  it('should correct signature', () => {
    expect(typeof basketStorage.get).toBe('function');
    expect(typeof basketStorage.update).toBe('function');
  });

  describe('method \'get\'', () => {
    it('should correct works if item not exists', () => {
      const expectedValue = basketStorage.get();

      expect(expectedValue).toEqual([]);
    });

    it('should correct works if item exists', () => {
      localStorageMock.setItem(BASKET_STORAGE_KEY, JSON.stringify(basketMock));
      const expectedValue = basketStorage.get();

      expect(expectedValue).toEqual(basketMock);
    });
  });

  describe('method \'update\'', () => {
    it('should correct works if item not exists', () => {
      basketStorage.update(basketMock);

      expect(localStorageMock.getItem(BASKET_STORAGE_KEY)).toBe(JSON.stringify(basketMock));
    });

    it('should correct works if item exists', () => {
      localStorageMock.setItem(BASKET_STORAGE_KEY, JSON.stringify(basketMock));
      const newBasket = [...basketMock, generateBasketItem()];

      basketStorage.update(newBasket);

      expect(localStorageMock.getItem(BASKET_STORAGE_KEY)).toBe(JSON.stringify(newBasket));
    });
  });
});
