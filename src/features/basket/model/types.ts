import { Product } from '@entities/product';

interface BaseBasketItem {
  count: number;
}

export interface BasketItemShort extends BaseBasketItem {
  productId: number;
}

export interface ProductInBasket extends BaseBasketItem {
  product: Product;
}
