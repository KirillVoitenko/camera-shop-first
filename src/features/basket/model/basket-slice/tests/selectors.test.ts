import { basketLoadingSelector, PickedBasketState } from '../selectors';

type EachArg = {
  name: string;
  selector: (state: PickedBasketState) => unknown;
  expected: unknown;
};

const BASKET_STATE_MOCK: PickedBasketState = {
  basket: {
    loading: false
  }
};

describe('basket slice selectors', () => {
  it.each<EachArg>([
    { expected: BASKET_STATE_MOCK.basket.loading, selector: basketLoadingSelector, name: 'basketLoadingSelector' }
  ])('selector $name should return correct value', ({ expected, selector }) => {
    const result = selector(BASKET_STATE_MOCK);

    expect(result).toEqual(expected);
  });
});
