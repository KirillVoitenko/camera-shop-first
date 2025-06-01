import { AppliedCoupon, BasketItemShort } from '@features/basket/model/types';
import { getBasketStorageInstance } from '../basket-storage';
import { LocalStorageMock } from '@test-utills/mocks/system-modules';
import { IToken } from '@shared/lib/token';
import { Nullable } from '@shared/model/utill-types';

describe('basket storage', () => {
  const localStorageMock = new LocalStorageMock({});
  const storageInstance = getBasketStorageInstance();

  beforeAll(() => {
    window.localStorage = localStorageMock;
  });

  beforeEach(() => {
    localStorageMock.clear();
  });

  it('should correct signature', () => {
    expectTypeOf(storageInstance.basket).toMatchTypeOf<IToken<BasketItemShort[]>>();
    expectTypeOf(storageInstance.coupon).toMatchTypeOf<IToken<Nullable<AppliedCoupon>>>();
  });
});
