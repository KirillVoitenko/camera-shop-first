import { getBasketStorageInstance } from '../basket-storage';
import { useAppStore, useAppSelector, useAppDispatch } from '@shared/lib/store';
import { BasketItemShort, CouponState } from '@features/basket/model/types';
import {
  addItemAction,
  basketDataSelector,
  updateItemAction,
  deleteItemAction,
  clearBasketAction,
  clearCouponAction
} from '@features/basket/model/basket-slice';
import { useCallback } from 'react';
import { checkCouponAction } from '@features/basket/model/basket-slice/actions';
import { basketCouponSelector } from '@features/basket/model/basket-slice/selectors';

type UseBasketReturn = {
  basket: BasketItemShort[];
  coupon: CouponState;
  addItem: (productId: number) => void;
  updateItem: (item: BasketItemShort) => void;
  deleteItem: (productId: number) => void;
  clearBasket: () => void;
  applyCoupon: (coupon: string) => Promise<void>;
  clearCoupon: () => void;
}

const storageInstance = getBasketStorageInstance();

export function useBasket(): UseBasketReturn {
  const basket = useAppSelector(basketDataSelector);
  const couponData = useAppSelector(basketCouponSelector);
  const store = useAppStore();
  const dispatch = useAppDispatch();

  const addItem = useCallback(
    (productId: number): void => {
      dispatch(addItemAction(productId));
      storageInstance.basket.update(store.getState().basket.basket);
    },
    [store, dispatch]
  );

  const updateItem = useCallback(
    (item: BasketItemShort): void => {
      dispatch(updateItemAction(item));
      storageInstance.basket.update(store.getState().basket.basket);
    },
    [store, dispatch]
  );

  const deleteItem = useCallback(
    (productId: number): void => {
      dispatch(deleteItemAction(productId));
      const newBasket = store.getState().basket.basket;

      storageInstance.basket.update(newBasket);

      if (newBasket.length === 0) {
        dispatch(clearCouponAction());
        storageInstance.basket.clear();
        storageInstance.coupon.clear();
      }
    },
    [store, dispatch]
  );

  const clearBasket = useCallback(
    () => {
      dispatch(clearBasketAction());
      dispatch(clearCouponAction());
      storageInstance.basket.clear();
      storageInstance.coupon.clear();
    },
    [dispatch]
  );

  const applyCoupon = useCallback(
    async (coupon: string) => {
      const dispatchedAction = await dispatch(checkCouponAction({coupon}));

      if (dispatchedAction.type === checkCouponAction.fulfilled.type) {
        const couponState = store.getState().basket.coupon;

        if (couponState.status === 'success' && !!couponState.data.coupon) {
          storageInstance.coupon.update(couponState.data);
        }

      }
    },
    [store, dispatch]
  );

  const clearCoupon = useCallback(
    () => {
      dispatch(clearCouponAction());
      storageInstance.coupon.clear();
    },
    [dispatch]
  );

  return {
    coupon: couponData,
    basket,
    addItem,
    updateItem,
    deleteItem,
    clearBasket,
    applyCoupon,
    clearCoupon
  };
}
