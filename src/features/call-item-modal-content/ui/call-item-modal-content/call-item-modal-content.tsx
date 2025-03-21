import { Product } from '@entities/product';
import { Classed } from '@shared/model/style-types';
import { JSX } from 'react';
import { BasketProductCard } from '@entities/product';
import { moneyFormat } from '@shared/lib/format';

type CallItemModalContentProps = Classed<{
  product: Product;
}>;

export function CallItemModalContent({product, className}: CallItemModalContentProps): JSX.Element {
  return (
    <form className={className}>
      <BasketProductCard
        product={product}
        className='basket-item--short'
      >
        <p className='basket-item__price'>
          <span className='visually-hidden'>Цена:</span>
          {moneyFormat(product.price)}
        </p>
      </BasketProductCard>
    </form>
  );
}
