import { PromoProduct } from '@entities/product/model/types';
import { ProductInBasket } from '@features/basket/model/types';

export const INIT_PRICE_INFO: PriceProductsInfo = {
  count: 0,
  price: 0
};

export type PriceProductsInfo = {
  count: number;
  price: number;
}

export type AllPriceInfo = {
  productsWithoutPromos: PriceProductsInfo;
  promoProducts: PriceProductsInfo;
}

export enum DiscountValue {
  TwoProducts = 3,
  FiveProducts = 5,
  TenProducts = 10,
  MaxDiscount = 15
}

export const getDiscountValue = (info: PriceProductsInfo): number => {
  let resultDiscount = 0.0;
  let discountDecrease = 0.0;

  if (info.count === 2) {
    resultDiscount = DiscountValue.TwoProducts;
  } else if (info.count > 2 && info.count <= 5) {
    resultDiscount = DiscountValue.FiveProducts;
  } else if (info.count > 5 && info.count <= 10) {
    resultDiscount = 10;
  } else if (info.count > 10) {
    resultDiscount = DiscountValue.MaxDiscount;
  }

  if (info.price >= 10000 && info.price < 20000) {
    discountDecrease = 1;
  } else if (info.price >= 20000 && info.price < 30000) {
    discountDecrease = 2;
  } else if (info.price >= 30000) {
    discountDecrease = 3;
  }

  return Math.max(resultDiscount - discountDecrease, 0) / 100;
};

export const getPriceInfo = (basketProducts: ProductInBasket[], promos: PromoProduct[]): AllPriceInfo => {
  const noPromoProducts: ProductInBasket[] = [];
  const promoProducts: ProductInBasket[] = [];

  for (let productIndex = 0; productIndex < basketProducts.length; productIndex++) {
    const currentBasketProduct = basketProducts[productIndex];

    if (promos.find((current) => current.id === currentBasketProduct.product.id)) {
      promoProducts.push(currentBasketProduct);
      continue;
    }
    noPromoProducts.push(currentBasketProduct);
  }

  const noPromoProductsInfo = noPromoProducts.reduce((accum, current) => ({
    count: accum.count + current.count,
    price: current.count * current.product.price + accum.price
  }), INIT_PRICE_INFO);

  const promoProductsInfo = promoProducts.reduce((accum, current) => ({
    count: accum.count + current.count,
    price: current.count * current.product.price + accum.price
  }), INIT_PRICE_INFO);

  return {
    promoProducts: promoProductsInfo,
    productsWithoutPromos: noPromoProductsInfo
  };
};
