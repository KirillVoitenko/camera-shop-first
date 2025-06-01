import {
  basketSliceReducer,
  BasketSliceState,
  INITIAL_STATE,
  addItem,
  initialize,
  deleteItem,
  updateItem
} from '../basket-slice';
import { emptyAction } from '@test-utills/mocks/redux';
import { createOrderFetchAction } from '@entities/order';
import faker from 'faker';
import { BasketItemShort } from '../../types';

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
      coupon: {
        data: {
          coupon: null,
          discountPercent: 0
        },
        status: 'success'
      },
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
      coupon: {
        data: {
          coupon: null,
          discountPercent: 0
        },
        status: 'success'
      },
      loading: false
    };

    const expectedState: BasketSliceState = structuredClone(initState);

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
      coupon: {
        data: {
          coupon: null,
          discountPercent: 0
        },
        status: 'success'
      },
      loading: false
    };

    const result = basketSliceReducer(INITIAL_STATE, initialize({items: expectedState.basket, appliedCoupon: null}));

    expect(result).toEqual(expectedState);
  });

  it('should return correct state by \'updateItem\' action', () => {
    const expectedBasketItem: BasketItemShort = {
      count: faker.datatype.number({min: 1, max: 10}),
      productId: FAKE_PRODUCT_ID
    };

    const initState: BasketSliceState = {
      basket: [{count: 0, productId: FAKE_PRODUCT_ID}],
      loading: false,
      coupon: {
        data: {
          coupon: null,
          discountPercent: 0
        },
        status: 'success'
      },
    };

    const expectedState: BasketSliceState = {
      basket: [
        expectedBasketItem
      ],
      coupon: {
        data: {
          coupon: null,
          discountPercent: 0
        },
        status: 'success'
      },
      loading: false
    };

    const result = basketSliceReducer(initState, updateItem(expectedBasketItem));

    expect(result).toEqual(expectedState);
  });

  it('should return correct state by \'deleteItem\' action', () => {
    const initState: BasketSliceState = {
      basket: [{count: 1, productId: FAKE_PRODUCT_ID}],
      loading: false,
      coupon: {
        data: {
          coupon: null,
          discountPercent: 0
        },
        status: 'success'
      },
    };

    const expectedState: BasketSliceState = {
      basket: [],
      loading: false,
      coupon: {
        data: {
          coupon: null,
          discountPercent: 0
        },
        status: 'success'
      },
    };

    const result = basketSliceReducer(initState, deleteItem(FAKE_PRODUCT_ID));

    expect(result).toEqual(expectedState);
  });
});
