import {
  basketSliceReducer,
  BasketSliceState,
  INITIAL_STATE,
  addItem,
  initialize
} from '../basket-slice';
import { emptyAction } from '@test-utills/mocks/redux';
import { createOrderFetchAction } from '@entities/order';
import faker from 'faker';

const FAKE_PRODUCT_ID = faker.datatype.number();


describe('Basket slice reducer', () => {
  it('should return initial state by empty action', () => {
    const expectedState = INITIAL_STATE;

    const result = basketSliceReducer(INITIAL_STATE, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state by state arg = undefined', () => {
    const result = basketSliceReducer(undefined, emptyAction);

    expect(result).toEqual(INITIAL_STATE);
  });

  it('should return correct state by \'createOrderFetchAction.pending\' action', () => {
    const expectedState: BasketSliceState = {
      ...INITIAL_STATE,
      loading: true
    };

    const result = basketSliceReducer(INITIAL_STATE, createOrderFetchAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should return correct state by \'createOrderFetchAction.fullfilled\' action', () => {
    const expectedState: BasketSliceState = {
      ...INITIAL_STATE,
      loading: false
    };

    const result = basketSliceReducer(INITIAL_STATE, createOrderFetchAction.fulfilled);

    expect(result).toEqual(expectedState);
  });

  it('should return correct state by \'createOrderFetchAction.rejected\' action', () => {
    const expectedState: BasketSliceState = {
      ...INITIAL_STATE,
      loading: false
    };

    const result = basketSliceReducer(INITIAL_STATE, createOrderFetchAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should return correct state by \'addItem\' action if item not exists', () => {
    const expectedState: BasketSliceState = {
      basket: [
        {
          count: 1,
          productId: FAKE_PRODUCT_ID
        }
      ],
      loading: false
    };

    const result = basketSliceReducer(INITIAL_STATE, addItem(FAKE_PRODUCT_ID));

    expect(result).toEqual(expectedState);
  });

  it('should return correct state by \'addItem\' action if item exists', () => {
    const initState: BasketSliceState = {
      basket: [
        {
          count: 1,
          productId: FAKE_PRODUCT_ID
        }
      ],
      loading: false
    };

    const expectedState: BasketSliceState = structuredClone(initState);
    expectedState.basket[0].count = 2;

    const result = basketSliceReducer(initState, addItem(FAKE_PRODUCT_ID));

    expect(result).toEqual(expectedState);
  });

  it('should return correct state by \'initialize\' action', () => {
    const expectedState: BasketSliceState = {
      basket: [
        {
          count: 1,
          productId: FAKE_PRODUCT_ID
        }
      ],
      loading: false
    };

    const result = basketSliceReducer(INITIAL_STATE, initialize(expectedState.basket));

    expect(result).toEqual(expectedState);
  });
});
