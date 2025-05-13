import { BasketItemShort } from '../../types';
import { basketDataSelector, basketLoadingSelector, PickedBasketState } from '../selectors';
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
    basket: createBasketItems(faker.datatype.number({min: 1, max: 10}))
  }
};

describe('basket slice selectors', () => {
  it.each<EachArg>([
    { expected: BASKET_STATE_MOCK.basket.loading, selector: basketLoadingSelector, name: 'basketLoadingSelector' },
    { expected: BASKET_STATE_MOCK.basket.basket, selector: basketDataSelector, name: 'basketDataSelector' }
  ])('selector $name should return correct value', ({ expected, selector }) => {
    const result = selector(BASKET_STATE_MOCK);

    expect(result).toEqual(expected);
  });
});
