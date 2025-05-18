import { useAppDispatch } from '@shared/lib/store';
import { initializeBasketAction } from '@features/basket/model/basket-slice';
import { useCallback } from 'react';
import { basketStorage } from '../basket-storage';

type UseBasketInitializeReturn = () => void;

export function useBasketInitialize(): UseBasketInitializeReturn {
  const dispatch = useAppDispatch();

  const returnedFunction = useCallback(
    () => dispatch(initializeBasketAction(basketStorage.get())),
    [dispatch]
  );

  return returnedFunction;
}
