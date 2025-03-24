import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { RootState } from '@shared/model/redux';
import { AppThunkDispatch, createAppThunkMiddlewareMock, isActionsEquals } from '@test-utills/mocks/redux';
import { ServerRoutesEnum } from '@shared/model/enums';
import { createOrderFetchAction } from '../actions';
import { generateOrderMock } from '@test-utills/mocks/order';

const ORDER_MOCK = generateOrderMock();

describe('Action \'fetchProductsAction\'', () => {
  const { axiosMockAdapter, middleware } = createAppThunkMiddlewareMock();
  const mockStoreCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>([middleware]);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  it('should dispatch all necessary actions if resolved', async () => {
    axiosMockAdapter.onPost(ServerRoutesEnum.Orders).reply(201);
    await store.dispatch(createOrderFetchAction(ORDER_MOCK));

    const result = isActionsEquals(
      store.getActions(),
      [
        createOrderFetchAction.pending,
        createOrderFetchAction.fulfilled
      ]
    );

    expect(result).toBeTruthy();
  });

  it('should dispatch all necessary actions if rejected', async () => {
    axiosMockAdapter.onPost(ServerRoutesEnum.Orders).reply(500);
    await store.dispatch(createOrderFetchAction(ORDER_MOCK));

    const result = isActionsEquals(
      store.getActions(),
      [
        createOrderFetchAction.pending,
        createOrderFetchAction.rejected
      ]
    );

    expect(result).toBeTruthy();
  });
});
