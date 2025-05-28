import { useAppDispatch } from '@shared/lib/store';
import { fetchProductsAction } from '@entities/product';
import { useEffect } from 'react';
import { useBasketInitialize } from '@features/basket';
import { toast } from 'react-toastify';
import { TOAST_CONTAINER_ID } from '@shared/ui/toast-container';

export const useStartup = (): void => {
  const dispatch = useAppDispatch();
  const initializeBasket = useBasketInitialize();

  useEffect(
    () => {
      let isMounted = false;

      const fetchProducts = async () => {
        if (!isMounted) {
          const dispatchedAction = await dispatch(fetchProductsAction());

          if (dispatchedAction.type === fetchProductsAction.rejected.type) {
            toast.error('Не удалось инициализировать приложение. Возможно сервер недоступен', {
              containerId: TOAST_CONTAINER_ID
            });
          }
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
