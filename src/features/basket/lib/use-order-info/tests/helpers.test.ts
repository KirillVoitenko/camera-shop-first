import { ProductInBasket } from '@features/basket/model/types';
import {
  DiscountValue,
  getDiscountValue,
  getPriceInfo,
  AllPriceInfo,
} from '../helpers';
import { generateProductMock, generatePromoProductMock } from '@test-utills/mocks/product';
import faker from 'faker';

type DiscountEachArg = {
  price: number;
  count: number;
  expected: number;
  caseAdditional: string;
}

describe('order helpers', () => {
  describe('function \'getDiscountValue\'', () => {
    it.each<DiscountEachArg>([
      { count: 0, price: 0, expected: 0, caseAdditional: 'empty basket'},
      { count: 1, price: 10000000, expected: 0, caseAdditional: 'very costly' },
      { count: 100000, price: 100, expected: DiscountValue.MaxDiscount, caseAdditional: 'wholesale lot and minibal price' },
      { count: 2, price: 900, expected: 3, caseAdditional: 'no decrease' },
      { count: 2, price: 15000, expected: 2, caseAdditional: 'decrease in 1 by price >= 10000 and price < 20000' },
      { count: 2, price: 10000, expected: 2, caseAdditional: 'decrease in 1 by price >= 10000 and price < 20000' },
      { count: 2, price: 20000, expected: 1, caseAdditional: 'decrease in 2 by price >= 20000 and price < 30000' },
      { count: 2, price: 25000, expected: 1, caseAdditional: 'decrease in 2 by price >= 20000 and price < 30000' },
      { count: 2, price: 30000, expected: 0, caseAdditional: 'decrease in 3 by price >= 30000' },

      { count: 3, price: 900, expected: 5, caseAdditional: 'no decrease' },
      { count: 3, price: 15000, expected: 4, caseAdditional: 'decrease in 1 price >= 10000 and price < 20000' },
      { count: 3, price: 10000, expected: 4, caseAdditional: 'decrease in 1 price >= 10000 and price < 20000' },
      { count: 3, price: 20000, expected: 3, caseAdditional: 'decrease in 2 by price >= 20000 and price < 30000' },
      { count: 3, price: 25000, expected: 3, caseAdditional: 'decrease in 2 by price >= 20000 and price < 30000' },
      { count: 3, price: 30000, expected: 2, caseAdditional: 'decrease in 3 by price >= 30000' },

      { count: 6, price: 900, expected: 10, caseAdditional: 'no decrease' },
      { count: 6, price: 15000, expected: 9, caseAdditional: 'decrease in 1 price >= 10000 and price < 20000' },
      { count: 6, price: 10000, expected: 9, caseAdditional: 'decrease in 1 price >= 10000 and price < 20000' },
      { count: 6, price: 20000, expected: 8, caseAdditional: 'decrease in 2 by price >= 20000 and price < 30000' },
      { count: 6, price: 25000, expected: 8, caseAdditional: 'decrease in 2 by price >= 20000 and price < 30000' },
      { count: 6, price: 30000, expected: 7, caseAdditional: 'decrease in 3 by price >= 30000' },

      { count: 11, price: 900, expected: 15, caseAdditional: 'no decrease' },
      { count: 11, price: 15000, expected: 14, caseAdditional: 'decrease in 1 price >= 10000 and price < 20000' },
      { count: 11, price: 10000, expected: 14, caseAdditional: 'decrease in 1 price >= 10000 and price < 20000' },
      { count: 11, price: 20000, expected: 13, caseAdditional: 'decrease in 2 by price >= 20000 and price < 30000' },
      { count: 11, price: 25000, expected: 13, caseAdditional: 'decrease in 2 by price >= 20000 and price < 30000' },
      { count: 11, price: 30000, expected: 12, caseAdditional: 'decrease in 3 by price >= 30000' },
    ])('should return $expected by price=$price and count=$count ($caseAdditional)', ({count, price, expected}) => {
      const result = getDiscountValue({count, price});

      expect(result).toBe(expected / 100);
    });
  });

  describe('function \'getPriceInfo\'', () => {
    it('should return correct value by basket product is no promo', () => {
      const product: ProductInBasket = {
        count: faker.datatype.number(),
        product: generateProductMock()
      };

      const expectedValue: AllPriceInfo = {
        productsWithoutPromos: {
          count: product.count,
          price: product.product.price * product.count
        },
        promoProducts: {
          count: 0,
          price: 0
        }
      };

      expect(expectedValue).toEqual(getPriceInfo([product], []));
    });

    it('should return correct value by product not exists and promos exists', () => {
      const product = generatePromoProductMock();

      const expectedValue: AllPriceInfo = {
        productsWithoutPromos: {
          count: 0,
          price: 0
        },
        promoProducts: {
          count: 0,
          price: 0,
        }
      };

      expect(expectedValue).toEqual(getPriceInfo([], [product]));
    });

    it('should return correct value by basket product is promo', () => {
      const promo = generatePromoProductMock();
      const basketProduct: ProductInBasket = {
        count: faker.datatype.number(),
        product: generateProductMock()
      };
      basketProduct.product.id = promo.id;

      const expectedValue: AllPriceInfo = {
        productsWithoutPromos: {
          count: 0,
          price: 0
        },
        promoProducts: {
          count: basketProduct.count,
          price: basketProduct.product.price * basketProduct.count,
        }
      };

      expect(expectedValue).toEqual(getPriceInfo([basketProduct], [promo]));
    });
  });
});
