import { Order } from '@entities/order/model/types';
import {
  isOrderWithPersonalCoupon,
  isOrderWithPublicCoupon,
  isPublicCoupon
} from '../type-guards';
import { CouponType, generateOrderMock } from '@test-utills/mocks/order';
import faker from 'faker';

type OrderGuardEachArg = {
  guard: (order: Order) => boolean;
  name: string;
  couponType: CouponType;
  expected: boolean;
};

type CouponGuardEachArg = {
  coupon: unknown;
  expected: boolean;
  name: string;
}

describe('Order typeguards', () => {
  it.each<OrderGuardEachArg>([
    { guard: isOrderWithPersonalCoupon, name: 'isOrderWithPersonalCoupon', couponType: 'personal', expected: true },
    { guard: isOrderWithPersonalCoupon, name: 'isOrderWithPersonalCoupon', couponType: 'publuc', expected: false },
    { guard: isOrderWithPublicCoupon, name: 'isOrderWithPublicCoupon', couponType: 'publuc', expected: true },
    { guard: isOrderWithPublicCoupon, name: 'isOrderWithPublicCoupon', couponType: 'personal', expected: false }
  ])('typeguard $name should correct works by $couponType coupon', ({ guard, couponType, expected }) => {
    const orderMock = generateOrderMock(couponType);

    expect(guard(orderMock)).toBe(expected);
  });

  it.each<CouponGuardEachArg>([
    { coupon: 'camera-333', expected: true, name: 'public' },
    { coupon: faker.lorem.word(), expected: false, name: 'any' },
  ])('typeguard \'isPublicCoupon\' should correct works by $name coupon', ({coupon, expected}) => {
    expect(isPublicCoupon(coupon)).toBe(expected);
  });
});
