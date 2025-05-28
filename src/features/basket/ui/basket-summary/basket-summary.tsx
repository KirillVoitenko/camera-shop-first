import { ProductInBasket } from '@features/basket/model/types';
import { Classed } from '@shared/model/style-types';
import classNames from 'classnames';
import { JSX } from 'react';
import { BasketOrderInfo } from './basket-order-info';

type BasketSummaryProps = Classed<{
  productsInBasket: ProductInBasket[];
}>;

export function BasketSummary({ className, productsInBasket }: BasketSummaryProps): JSX.Element {
  const containerClassName = classNames('basket__summary', className);
  return (
    <div className={containerClassName}>
      <div className='basket__promo'></div>
      <BasketOrderInfo basket={productsInBasket} />
    </div>
  );
}
