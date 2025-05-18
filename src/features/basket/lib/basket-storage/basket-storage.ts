import { BASKET_STORAGE_KEY } from '@features/basket/config/const';
import { BasketItemShort } from '@features/basket/model/types';

export interface IBasketStorage {
  get: () => BasketItemShort[];
  update: (newValue: BasketItemShort[]) => void;
}

class BasketStorage implements IBasketStorage {
  private storageKey = BASKET_STORAGE_KEY;

  private get storageData() {
    return localStorage.getItem(this.storageKey);
  }

  public get = () => {
    if(this.storageData) {
      return JSON.parse(this.storageData) as BasketItemShort[];
    }

    return [];
  };

  public update = (newValue: BasketItemShort[]) => {
    localStorage.removeItem(this.storageKey);
    localStorage.setItem(this.storageKey, JSON.stringify(newValue));
  };
}

export const basketStorage: IBasketStorage = new BasketStorage();
