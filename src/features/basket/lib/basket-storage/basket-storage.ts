import { BASKET_STORAGE_KEY, COUPON_STORAGE_KEY } from '@features/basket/config/const';
import { AppliedCoupon, BasketItemShort } from '@features/basket/model/types';
import { IToken, LocalStorageToken } from '@shared/lib/token';
import { Nullable } from '@shared/model/utill-types';

export interface IBasketStorage {
  get basket(): IToken<BasketItemShort[]>;
  get coupon(): IToken<Nullable<AppliedCoupon>>;
}

class BasketStorage implements IBasketStorage {
  private basketStorageKey = BASKET_STORAGE_KEY;
  private couponStorageKey = COUPON_STORAGE_KEY;

  public get basket(): IToken<BasketItemShort[]> {
    return new LocalStorageToken<BasketItemShort[]>(this.basketStorageKey, []);
  }

  public get coupon(): IToken<Nullable<AppliedCoupon>> {
    return new LocalStorageToken<Nullable<AppliedCoupon>>(this.couponStorageKey, null);
  }
}

const basketStorage: IBasketStorage = new BasketStorage();

export const getBasketStorageInstance = (): IBasketStorage => basketStorage;
