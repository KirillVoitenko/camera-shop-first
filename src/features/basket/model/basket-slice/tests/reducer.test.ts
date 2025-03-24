import { basketSliceReducer, BasketSliceState, INITIAL_STATE } from '../basket-slice';
import { emptyAction } from '@test-utills/mocks/redux';
import { createOrderFetchAction } from '@entities/order';

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
});
