import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BaseLoadableState } from '@shared/model/state';
import { createOrderFetchAction } from '@entities/order';
import { AppliedCoupon, BasketItemShort, CouponState } from '../types';
import { checkCouponAction } from './actions';
import { Nullable } from '@shared/model/utill-types';

const INITIAL_COUPON_STATE: CouponState = {
  status: 'success',
  data: {
    coupon: null,
    discountPercent: 0
  }
};

export interface BasketSliceState extends BaseLoadableState {
  basket: BasketItemShort[];
  coupon: CouponState;
}

type InitializeActionPayload = {
  items: BasketItemShort[];
  appliedCoupon: Nullable<AppliedCoupon>;
}

export const INITIAL_STATE: BasketSliceState = {
  loading: false,
  basket: [],
  coupon: INITIAL_COUPON_STATE
};

const basketSlice = createSlice({
  name: 'basket',
  initialState: INITIAL_STATE,
  reducers: {
    addItem: (state, action: PayloadAction<number>) => {
      const itemIndex = state.basket.findIndex((current) => current.productId === action.payload);

      if (itemIndex === -1) {
        state.basket.push({
          count: 1,
          productId: action.payload
        });
      }
    },

    updateItem: (state, action: PayloadAction<BasketItemShort>) => {
      for (let itemIndex = 0; itemIndex < state.basket.length; itemIndex++) {
        if (state.basket[itemIndex].productId === action.payload.productId && state.basket[itemIndex].count !== action.payload.count) {
          state.basket[itemIndex] = action.payload;
          break;
        }
      }
    },

    deleteItem: (state, action: PayloadAction<number>) => {
      const itemIndex = state.basket.findIndex((current) => current.productId === action.payload);

      if (itemIndex !== -1) {
        state.basket = state.basket.filter((current) => current.productId !== action.payload);
      }
    },

    clearBasket: (state) => {
      state.basket = INITIAL_STATE.basket;
    },

    clearCoupon: (state) => {
      state.coupon = INITIAL_STATE.coupon;
    },

    initialize: (state, action: PayloadAction<InitializeActionPayload>) => {
      const { appliedCoupon, items } = action.payload;
      state.basket = items;

      if (appliedCoupon) {
        state.coupon = {
          status: 'success',
          data: appliedCoupon
        };
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(createOrderFetchAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createOrderFetchAction.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(createOrderFetchAction.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(checkCouponAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkCouponAction.fulfilled, (state, action) => {
      state.loading = false;
      state.coupon.status = 'success';
      state.coupon.data = action.payload;
    });
    builder.addCase(checkCouponAction.rejected, (state) => {
      state.loading = false;
      state.coupon.status = 'error';
      state.coupon.data = null;
    });

  },
});

export const basketSliceReducer = basketSlice.reducer;
export const {
  addItem,
  initialize,
  updateItem,
  deleteItem,
  clearBasket,
  clearCoupon,
} = basketSlice.actions;
