import { BasketItemShort } from '../../types';
import { basketCouponSelector, basketDataSelector, basketLoadingSelector, PickedBasketState } from '../selectors';
import faker from 'faker';

type EachArg = {
  name: string;
  selector: (state: PickedBasketState) => unknown;
  expected: unknown;
};

const createBasketItems = (length: number): BasketItemShort[] => Array.from({length}).map(() => ({
  count: faker.datatype.number(),
  productId: faker.datatype.number()
}));

const BASKET_STATE_MOCK: PickedBasketState = {
  basket: {
    loading: false,
    basket: createBasketItems(faker.datatype.number({min: 1, max: 10})),
    coupon: {
      data: {
        coupon: 'camera-333',
        discountPercent: 15
      },
      status: 'success'
    }
  }
};

describe('basket slice selectors', () => {
  it.each<EachArg>([
    { expected: BASKET_STATE_MOCK.basket.loading, selector: basketLoadingSelector, name: 'basketLoadingSelector' },
    { expected: BASKET_STATE_MOCK.basket.basket, selector: basketDataSelector, name: 'basketDataSelector' },
    { expected: BASKET_STATE_MOCK.basket.coupon, selector: basketCouponSelector, name: 'basketCouponSelector' }
  ])('selector $name should return correct value', ({ expected, selector }) => {
    const result = selector(BASKET_STATE_MOCK);

    expect(result).toEqual(expected);
  });
});
