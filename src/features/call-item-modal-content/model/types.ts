import type { OrderWithPersonalCoupon } from '@entities/order';

export type CallFormValue = Pick<OrderWithPersonalCoupon, 'tel'>;
