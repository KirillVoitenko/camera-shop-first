import { createSlice } from '@reduxjs/toolkit';
import { BaseLoadableState } from '@shared/model/state';
import { createOrderFetchAction } from '@entities/order';

export type BasketSliceState = BaseLoadableState;

export const INITIAL_STATE: BasketSliceState = {
  loading: false
};

const basketSlice = createSlice({
  name: 'basket',
  initialState: INITIAL_STATE,
  reducers: {},
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
