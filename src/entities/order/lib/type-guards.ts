import type {
  Order,
  OrderWithPersonalCoupon,
  OrderWithPublicCoupon,
  PublicCoupon,
} from '../model/types';

const ALL_PUBLIC_COUPONS = new Set<PublicCoupon>(['camera-333', 'camera-444', 'camera-555']);

export const isPublicCoupon = (coupon: unknown): coupon is PublicCoupon => ALL_PUBLIC_COUPONS.has(coupon as PublicCoupon);

export const isOrderWithPublicCoupon = (order: Order): order is OrderWithPublicCoupon => isPublicCoupon(order.coupon);

export const isOrderWithPersonalCoupon = (order: Order): order is OrderWithPersonalCoupon => !isOrderWithPublicCoupon(order);
