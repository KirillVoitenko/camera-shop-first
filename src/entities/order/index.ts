import type {
  Order,
  OrderWithPersonalCoupon,
  OrderWithPublicCoupon,
  PersonalCoupon,
  PublicCoupon,
  OrderStatus,
  OrderStatusError,
  OrderStatusSuccess
} from './model/types';
import {
  isOrderWithPersonalCoupon,
  isOrderWithPublicCoupon
} from './lib/type-guards';
import { createOrderFetchAction } from './model/actions';
import { CreateOrderResultModalContent } from './ui/create-order-result-modal-content';

export {
  Order,
  OrderWithPersonalCoupon,
  OrderWithPublicCoupon,
  PersonalCoupon,
  PublicCoupon,
  isOrderWithPersonalCoupon,
  isOrderWithPublicCoupon,
  createOrderFetchAction,
  OrderStatus,
  OrderStatusError,
  OrderStatusSuccess,
  CreateOrderResultModalContent
};
