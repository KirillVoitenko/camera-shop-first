import { PublicCoupon } from '@entities/order';
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

export type AppliedCoupon = {
  coupon: PublicCoupon;
  discountPercent: number;
}

export type NoCoupon = {
  coupon: null;
  discountPercent: 0;
}

export type NotAppliedCouponState = {
  status: 'error';
  data: null;
}

export type AppliedCouponState = {
  status: 'success';
  data: AppliedCoupon | NoCoupon;
}

export type CouponState = NotAppliedCouponState | AppliedCouponState
