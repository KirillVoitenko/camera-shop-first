import { ProductInBasket } from '@features/basket/model/types';
import { Classed } from '@shared/model/style-types';
import classNames from 'classnames';
import { JSX } from 'react';
import { BasketOrderInfo } from './basket-order-info';
import { BasketPromo } from '../basket-promo';

type BasketSummaryProps = Classed<{
  productsInBasket: ProductInBasket[];
}>;

export function BasketSummary({ className, productsInBasket }: BasketSummaryProps): JSX.Element {
  const containerClassName = classNames('basket__summary', className);

  return (
    <div className={containerClassName}>
      <BasketPromo />
      <BasketOrderInfo basket={productsInBasket} />
    </div>
  );
}
