import { useAppDispatch } from '@shared/lib/store';
import { fetchProductsAction } from '@entities/product';
import { useEffect } from 'react';

export const useStartup = (): void => {
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      let isMounted = false;

      const fetchProducts = async () => {
        if (!isMounted) {
          await dispatch(fetchProductsAction());
        }
      };

      fetchProducts();

      return () => {
        isMounted = true;
      };
    }
  );
};
