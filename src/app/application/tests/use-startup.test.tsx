import { renderHook, waitFor } from '@testing-library/react';
import { getStoreWrapper } from '@test-utills/wrappers';
import { Action } from '@reduxjs/toolkit';
import { generateProductMock, generatePromoProductMock } from '@test-utills/mocks/product';
import faker from 'faker';
import { useStartup } from '../use-startup';
import {
  AppThunkDispatch,
  createAppThunkMiddlewareMock,
  isActionsEquals
} from '@test-utills/mocks/redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '@shared/model/redux';
import { FC } from 'react';
import { fetchProductsAction } from '@entities/product';
import { ServerRoutesEnum } from '@shared/model/enums';

const INITIALIZE_BASKET_MOCK = vi.fn();
const PRODUCTS_MOCK = Array.from({length: faker.datatype.number({max: 10})}).map(() => generateProductMock());
const PROMOS_MOCK = Array.from({length: faker.datatype.number({max: 10})}).map(() => generatePromoProductMock());

describe('Hook \'useStartup\'', () => {
  const appThunkMiddlewareMock = createAppThunkMiddlewareMock();
  const storeCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>([appThunkMiddlewareMock.middleware]);
  let store: ReturnType<typeof storeCreator>;
  let storeWrapper: FC;

  beforeEach(() => {
    store = storeCreator({
      products: {
        loading: false,
        products: [],
      }
    });

    appThunkMiddlewareMock.axiosMockAdapter.reset();

    appThunkMiddlewareMock.axiosMockAdapter.onGet(ServerRoutesEnum.Products).reply(200, PRODUCTS_MOCK);
    appThunkMiddlewareMock.axiosMockAdapter.onGet(ServerRoutesEnum.Promo).reply(200, PROMOS_MOCK);
    storeWrapper = getStoreWrapper(store);
    INITIALIZE_BASKET_MOCK.mockReset();
  });

  it('should dispatch \'fetchProductsAction\'', async () => {
    vi.spyOn(await import('@features/basket'), 'useBasketInitialize').mockImplementation(() => INITIALIZE_BASKET_MOCK);

    await waitFor(() => renderHook(() => useStartup(), {wrapper: storeWrapper}));

    const result = isActionsEquals(
      store.getActions(),
      [
        fetchProductsAction.pending,
        fetchProductsAction.fulfilled
      ]
    );

    expect(result).toBeTruthy();
  });

  it('should initialize basket', async () => {
    vi.spyOn(await import('@features/basket'), 'useBasketInitialize').mockImplementation(() => INITIALIZE_BASKET_MOCK);

    await waitFor(() => renderHook(() => useStartup(), {wrapper: storeWrapper}));

    expect(INITIALIZE_BASKET_MOCK).toBeCalledTimes(1);
  });
});
