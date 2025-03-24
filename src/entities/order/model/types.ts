import { Nullable } from '@shared/model/utill-types';

export type PublicCoupon = 'camera-333' | 'camera-444' | 'camera-555';

export type PersonalCoupon = Nullable<string>;

interface BaseOrder<TCouponType> {
  camerasIds: number[];
  coupon: TCouponType;
}

export type OrderWithPublicCoupon = BaseOrder<PublicCoupon>;

export interface OrderWithPersonalCoupon extends BaseOrder<PersonalCoupon> {
  tel: string;
}

export type Order = OrderWithPersonalCoupon | OrderWithPublicCoupon;
