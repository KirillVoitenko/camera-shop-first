import { useAppDispatch, useAppSelector } from '@shared/lib/store';
import { promoProductsDataSelector } from '@entities/product';
import { ProductInBasket } from '@features/basket/model/types';
import { getPriceInfo, getDiscountValue } from './helpers';
import { createOrderFetchAction, OrderWithPublicCoupon, PublicCoupon } from '@entities/order';
import { Nullable } from '@shared/model/utill-types';

type OrderPriceInfo = {
  allPrice: number;
  discountPrice: number;
  toPaymentPrice: number;
}

type UseOrderInfoReturn = {
  getOrderPriceInfo: (productsInfo: ProductInBasket[]) => OrderPriceInfo;
  createOrder: (productsInfo: ProductInBasket[], coupon: Nullable<PublicCoupon>) => Promise<void>;
}

export const useOrderInfo = (): UseOrderInfoReturn => {
  const promos = useAppSelector(promoProductsDataSelector);
  const dispatch = useAppDispatch();


  const getOrderPriceInfo = (productsInfo: ProductInBasket[]): OrderPriceInfo => {
    const priceInfo = getPriceInfo(productsInfo, promos);
    const discountValue = getDiscountValue(priceInfo.productsWithoutPromos);

    const discountPrice = priceInfo.productsWithoutPromos.price * discountValue;
    const allPrice = priceInfo.promoProducts.price + priceInfo.productsWithoutPromos.price;
    const toPaymentPrice = allPrice - discountPrice;

    return {
      allPrice,
      toPaymentPrice,
      discountPrice,
    };
  };

  const createOrder = async (products: ProductInBasket[], coupon: Nullable<PublicCoupon> = null) => {
    const camerasIds: number[] = [];
    products.forEach((current) => {
      const currentIds = Array.from({length: current.count}).map(() => current.product.id);
      camerasIds.push(...currentIds);
    });

    const order: OrderWithPublicCoupon = {
      camerasIds,
      coupon
    };

    await dispatch(createOrderFetchAction(order));
  };

  return {
    getOrderPriceInfo,
    createOrder
  };
};
