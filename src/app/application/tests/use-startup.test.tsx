import { renderHook, waitFor } from '@testing-library/react';
import { getStoreWrapper } from '@test-utills/wrappers';
import { Action, createAsyncThunk } from '@reduxjs/toolkit';
import { generateProductMock, generatePromoProductMock } from '@test-utills/mocks/product';
import faker from 'faker';
import { Product } from '@entities/product';
import { useStartup } from '../use-startup';
import { AppThunkDispatch, createAppThunkMiddlewareMock, isActionsEquals } from '@test-utills/mocks/redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '@shared/model/redux';
import { FC } from 'react';
import { PromoProduct } from '@entities/product/model/types';

const PRODUCTS_MOCK = Array.from({length: faker.datatype.number({max: 10})}).map(() => generateProductMock());
const PROMOS_MOCK = Array.from({length: faker.datatype.number({max: 10})}).map(() => generatePromoProductMock());

type FetchProductActionReturn = {
  products: Product[];
  promos: PromoProduct[];
}

const fakeFetchProductsAction = createAsyncThunk<FetchProductActionReturn, undefined>(
  'test/fetchProduct',
  async (): Promise<FetchProductActionReturn> => Promise.resolve({products: PRODUCTS_MOCK, promos: PROMOS_MOCK})
);

describe('Hook \'useStartup\'', () => {
  const storeCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>([createAppThunkMiddlewareMock().middleware]);
  let store: ReturnType<typeof storeCreator>;
  let storeWrapper: FC;

  beforeEach(() => {
    store = storeCreator({
      products: {
        loading: false,
        products: [],
      }
    });

    storeWrapper = getStoreWrapper(store);
  });

  it('should dispatch \'fetchProductsAction\'', async () => {
    vi.spyOn(await import('@entities/product'), 'fetchProductsAction').mockImplementation(fakeFetchProductsAction);

    await waitFor(() => renderHook(() => useStartup(), {wrapper: storeWrapper}));

    const result = isActionsEquals(
      store.getActions(),
      [
        fakeFetchProductsAction.pending,
        fakeFetchProductsAction.fulfilled
      ]
    );

    expect(result).toBeTruthy();
  });
});
