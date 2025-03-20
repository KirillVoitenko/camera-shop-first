import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import { RootState } from '@shared/model/redux';
import { AppThunkDispatch, createAppThunkMiddlewareMock, isActionsEquals } from '@test-utills/mocks/redux';
import { INITIAL_STATE } from '../product-slice';
import { ServerRoutesEnum } from '@shared/model/enums';
import { fetchProductAction } from '../actions';
import { generateProductMock } from '@test-utills/mocks/product';
import { generatePath } from 'react-router-dom';
import { redirectToRouteAction } from '@shared/lib/store';
import { generateCommentMock } from '@test-utills/mocks/comment';

describe('Action \'fetchProductAction\'', () => {
  const { axiosMockAdapter, middleware } = createAppThunkMiddlewareMock();
  const mockStoreCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>([middleware]);
  const productMock = generateProductMock();
  const commentsMock = [generateCommentMock()];
  const similarProductsMock = [generateProductMock()];
  let store: ReturnType<typeof mockStoreCreator>;
  const fetchActionArgument = {
    cameraId: productMock.id
  };
  const stringifyedCameraId = String(productMock.id);
  const fetcProductUrl = generatePath(ServerRoutesEnum.Product, {cameraId: stringifyedCameraId});
  const fetchCommentUrl = generatePath(ServerRoutesEnum.Comments, { cameraId: stringifyedCameraId });
  const fetchSimilarUrl = generatePath(ServerRoutesEnum.SimilarProducts, { cameraId: stringifyedCameraId });

  beforeEach(() => {
    store = mockStoreCreator({ product: { ...INITIAL_STATE } });
  });

  it('should dispatch all necessary actions if resolved', async () => {
    axiosMockAdapter.onGet(fetcProductUrl).reply(200, productMock);
    axiosMockAdapter.onGet(fetchCommentUrl).reply(200, commentsMock);
    axiosMockAdapter.onGet(fetchSimilarUrl).reply(200, similarProductsMock);
    await store.dispatch(fetchProductAction(fetchActionArgument));

    const result = isActionsEquals(
      store.getActions(),
      [
        fetchProductAction.pending,
        fetchProductAction.fulfilled
      ]
    );

    expect(result).toBeTruthy();
  });

  it('should dispatch all necessary actions if rejected', async () => {
    axiosMockAdapter.onGet(fetcProductUrl).reply(500);
    await store.dispatch(fetchProductAction(fetchActionArgument));

    const result = isActionsEquals(
      store.getActions(),
      [
        fetchProductAction.pending,
        fetchProductAction.rejected
      ]
    );

    expect(result).toBeTruthy();
  });

  it('should dispatch all necessary actions if rejected by 404', async () => {
    axiosMockAdapter.onGet(fetcProductUrl).reply(404);
    await store.dispatch(fetchProductAction(fetchActionArgument));

    const result = isActionsEquals(
      store.getActions(),
      [
        fetchProductAction.pending,
        fetchProductAction.rejected,
        redirectToRouteAction
      ]
    );

    expect(result).toBeTruthy();
  });
});
