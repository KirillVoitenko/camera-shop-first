import { useAppDispatch } from '@shared/lib/store';
import { initializeBasketAction } from '@features/basket/model/basket-slice';
import { useCallback } from 'react';
import { getBasketStorageInstance } from '../basket-storage';

type UseBasketInitializeReturn = () => void;

const storageInstance = getBasketStorageInstance();

export function useBasketInitialize(): UseBasketInitializeReturn {
  const dispatch = useAppDispatch();

  const returnedFunction = useCallback(
    () => {
      const basketItems = storageInstance.basket.get();
      const appliedCoupon = storageInstance.coupon.get();
      dispatch(initializeBasketAction({
        appliedCoupon,
        items: basketItems
      }));
    },
    [dispatch]
  );

  return returnedFunction;
}
