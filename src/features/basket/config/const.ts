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

export enum CounterRange {
  Min = 1,
  Max = 99,
}

export enum BasketItemTestId {
  DeleteButton = 'basket-item-delete-button',
}

export enum BasketItemQuantityTestId {
  Container = 'basket-item-quantity',
  IncreaseCountButton = 'basket-item-increase-count',
  DecreaseCountButton = 'basket-item-decrease-count',
  CountInput = 'basket-item-count-input',

}
