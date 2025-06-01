import { ElementSize } from '@shared/model/html';

export const BASKET_ICON_SIZE: ElementSize = {
  height: 16,
  width: 16,
};

export enum BasketLinkTestId {
  Link = 'basket-link',
  Icon = 'basket-link-icon'
}

export const BASKET_STORAGE_KEY = 'CAMERA_SHOP/BASKET';
export const COUPON_STORAGE_KEY = 'CAMERA_SHOP/APPLIED_COUPON';

export enum CounterRange {
  Min = 1,
  Max = 9,
}

export enum BasketItemTestId {
  DeleteButton = 'basket-item-delete-button',
  OneProductPrice = 'basket-item-product-price',
  AllProductPrice = 'basket-item-all-price'
}

export enum BasketItemQuantityTestId {
  Container = 'basket-item-quantity',
  IncreaseCountButton = 'basket-item-increase-count',
  DecreaseCountButton = 'basket-item-decrease-count',
  CountInput = 'basket-item-count-input',

}
