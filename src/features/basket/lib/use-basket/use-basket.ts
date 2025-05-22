import { basketStorage } from '../basket-storage';
import { useAppStore, useAppSelector } from '@shared/lib/store';
import { BasketItemShort } from '@features/basket/model/types';
import {
  addItemAction,
  basketDataSelector,
  updateItemAction,
  deleteItemAction,
} from '@features/basket/model/basket-slice';
import { useCallback } from 'react';

type UseBasketReturn = {
  basket: BasketItemShort[];
  addItem: (productId: number) => void;
  updateItem: (item: BasketItemShort) => void;
  deleteItem: (productId: number) => void;
}

export function useBasket(): UseBasketReturn {
  const basket = useAppSelector(basketDataSelector);
  const store = useAppStore();

  const addItem = useCallback(
    (productId: number): void => {
      store.dispatch(addItemAction(productId));
      basketStorage.update(store.getState().basket.basket);
    },
    [store]
  );

  const updateItem = useCallback(
    (item: BasketItemShort): void => {
      store.dispatch(updateItemAction(item));
      basketStorage.update(store.getState().basket.basket);
    },
    [store]
  );

  const deleteItem = useCallback(
    (productId: number): void => {
      store.dispatch(deleteItemAction(productId));
      basketStorage.update(store.getState().basket.basket);
    },
    [store]
  );

  return {
    basket,
    addItem,
    updateItem,
    deleteItem
  };
}
