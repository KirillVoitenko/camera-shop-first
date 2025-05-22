import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BaseLoadableState } from '@shared/model/state';
import { createOrderFetchAction } from '@entities/order';
import { BasketItemShort } from '../types';

export interface BasketSliceState extends BaseLoadableState {
  basket: BasketItemShort[];
}

export const INITIAL_STATE: BasketSliceState = {
  loading: false,
  basket: []
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

    initialize: (state, action: PayloadAction<BasketItemShort[]>) => {
      state.basket = action.payload;
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
  },
});

export const basketSliceReducer = basketSlice.reducer;
export const {
  addItem,
  initialize,
  updateItem,
  deleteItem
} = basketSlice.actions;
