import { useAppDispatch } from '@shared/lib/store';
import { fetchProductsAction } from '@entities/product';
import { useEffect } from 'react';
import { useBasketInitialize } from '@features/basket';

export const useStartup = (): void => {
  const dispatch = useAppDispatch();
  const initializeBasket = useBasketInitialize();

  useEffect(
    () => {
      let isMounted = false;

      const fetchProducts = async () => {
        if (!isMounted) {
          await dispatch(fetchProductsAction());
        }
      };

      initializeBasket();
      fetchProducts();

      return () => {
        isMounted = true;
      };
    }
  );
};
