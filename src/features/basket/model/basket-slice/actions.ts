import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppliedCoupon } from '../types';
import { AxiosInstance } from 'axios';
import { ServerRoutesEnum } from '@shared/model/enums';
import { PublicCoupon } from '@entities/order';

export type CheckCouponActionArgument = {
  coupon: string;
};

export enum BasketActionsNames {
  CheckCoupon = 'basket/checkCoupon'
}

export const checkCouponAction = createAsyncThunk<
  AppliedCoupon,
  CheckCouponActionArgument,
  {
    extra: AxiosInstance;
  }
>(
  BasketActionsNames.CheckCoupon,
  async (arg, { extra: apiInstance }) => {
    const { data: discountPercent } = await apiInstance.post<number>(ServerRoutesEnum.Coupons, arg);

    return {
      coupon: arg.coupon as PublicCoupon,
      discountPercent
    };
  }
);
