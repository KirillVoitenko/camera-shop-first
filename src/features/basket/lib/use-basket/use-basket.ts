import { basketStorage } from '../basket-storage';
import { useAppStore, useAppSelector } from '@shared/lib/store';
import { BasketItemShort } from '@features/basket/model/types';
import { addItemAction, basketDataSelector } from '@features/basket/model/basket-slice';
import { useCallback } from 'react';

type UseBasketReturn = {
  basket: BasketItemShort[];
  addItem: (productId: number) => void;
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

  return {
    basket,
    addItem
  };
}
