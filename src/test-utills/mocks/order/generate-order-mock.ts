import type {
  Order,
  OrderWithPersonalCoupon,
  OrderWithPublicCoupon,
} from '@entities/order';
import faker from 'faker';

export type CouponType = 'personal' | 'publuc';

const generateCamerasIds = () => Array.from({length: faker.datatype.number({min: 1, max: 20})}).map(() => faker.datatype.number());

export const generateOrderMock = (couponType: CouponType = 'publuc'): Order => {
  switch(couponType) {
    case 'publuc': {
      const publicCouponOrder: OrderWithPublicCoupon = {
        camerasIds: generateCamerasIds(),
        coupon: 'camera-333',
      };
      return publicCouponOrder;
    }
    default: {
      const personalCouponOrder: OrderWithPersonalCoupon = {
        camerasIds: generateCamerasIds(),
        coupon: faker.datatype.string(),
        tel: faker.phone.phoneNumber('+7##########')
      };
      return personalCouponOrder;
    }
  }
};
