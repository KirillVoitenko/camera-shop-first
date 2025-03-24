import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { RootState } from '@shared/model/redux';
import { AppThunkDispatch, createAppThunkMiddlewareMock, isActionsEquals } from '@test-utills/mocks/redux';
import { INITIAL_STATE } from '../products-slice';
import { ServerRoutesEnum } from '@shared/model/enums';
import { fetchProductsAction } from '../actions';

describe('Action \'fetchProductsAction\'', () => {
  const { axiosMockAdapter, middleware } = createAppThunkMiddlewareMock();
  const mockStoreCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>([middleware]);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ products: { ...INITIAL_STATE } });
  });

  it('should dispatch all necessary actions if resolved', async () => {
    axiosMockAdapter.onGet(ServerRoutesEnum.Products).reply(200);
    axiosMockAdapter.onGet(ServerRoutesEnum.Promo).reply(200);
    await store.dispatch(fetchProductsAction());

    const result = isActionsEquals(
      store.getActions(),
      [
        fetchProductsAction.pending,
        fetchProductsAction.fulfilled
      ]
    );

    expect(result).toBeTruthy();
  });

  it('should dispatch all necessary actions if rejected', async () => {
    axiosMockAdapter.onGet(ServerRoutesEnum.Products).reply(500);
    axiosMockAdapter.onGet(ServerRoutesEnum.Promo).reply(200);

    await store.dispatch(fetchProductsAction());

    const result = isActionsEquals(
      store.getActions(),
      [
        fetchProductsAction.pending,
        fetchProductsAction.rejected
      ]
    );

    expect(result).toBeTruthy();
  });
});
