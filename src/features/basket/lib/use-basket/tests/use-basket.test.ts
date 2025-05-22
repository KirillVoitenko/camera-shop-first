import { getStoreWrapper } from '@test-utills/wrappers';
import { act, renderHook } from '@testing-library/react';
import { useBasket } from '../use-basket';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { RootState } from '@shared/model/redux';
import { Action } from '@reduxjs/toolkit';
import { AppThunkDispatch, isActionsEquals } from '@test-utills/mocks/redux';
import { BasketItemShort } from '@features/basket/model/types';
import faker from 'faker';
import {
  addItemAction,
  updateItemAction,
  deleteItemAction
} from '@features/basket/model/basket-slice';
import { basketStorage } from '../../basket-storage';


const generateBasketItem = (): BasketItemShort => ({
  count: faker.datatype.number(),
  productId: faker.datatype.number()
});

describe('hook \'useBasket\'', () => {
  const getStorageItemMock = vi.fn();
  const updateStorageItemMock = vi.fn();

  vi.spyOn(basketStorage, 'get').mockImplementation(getStorageItemMock);
  vi.spyOn(basketStorage, 'update').mockImplementation(updateStorageItemMock);

  const basketMock = Array.from({length: faker.datatype.number()}).map(generateBasketItem);
  const storeCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>();

  const store = storeCreator({
    basket: {
      loading: false,
      basket: basketMock
    }
  });

  beforeEach(() => {
    store.clearActions();
    getStorageItemMock.mockReset();
    updateStorageItemMock.mockReset();
  });

  it('should return correct signature', () => {
    const { result } = renderHook(() => useBasket(), {wrapper: getStoreWrapper(store)});

    const { addItem, basket, deleteItem, updateItem } = result.current;

    expect(basket).toEqual(basketMock);
    expect(typeof addItem).toBe('function');
    expect(typeof deleteItem).toBe('function');
    expect(typeof updateItem).toBe('function');
  });

  it('method \'addItem\' should correct works', () => {
    const { result } = renderHook(() => useBasket(), {wrapper: getStoreWrapper(store)});

    const { addItem } = result.current;

    act(() => addItem(faker.datatype.number()));

    expect(isActionsEquals(store.getActions(), [addItemAction])).toBeTruthy();
    expect(updateStorageItemMock).toBeCalledTimes(1);
  });

  it('method \'updateItem\' should correct works', () => {
    const { result } = renderHook(() => useBasket(), {wrapper: getStoreWrapper(store)});

    const { updateItem } = result.current;

    act(() => updateItem({...basketMock[0], count: faker.datatype.number()}));

    expect(isActionsEquals(store.getActions(), [updateItemAction])).toBeTruthy();
    expect(updateStorageItemMock).toBeCalledTimes(1);
  });

  it('method \'deleteItem\' should correct works', () => {
    const { result } = renderHook(() => useBasket(), {wrapper: getStoreWrapper(store)});

    const { deleteItem } = result.current;

    act(() => deleteItem(basketMock[0].productId));

    expect(isActionsEquals(store.getActions(), [deleteItemAction])).toBeTruthy();
    expect(updateStorageItemMock).toBeCalledTimes(1);
  });
});
