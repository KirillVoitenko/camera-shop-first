import { Classed } from '@shared/model/style-types';
import { JSX } from 'react';
import { PRODUCTS_LIST_CONTAINER_TEST_ID } from '@features/products-list/config/const';
import classNames from 'classnames';
import { Product, ShortProductCard } from '@entities/product';

type ProductsListProps = Classed<{
  onBuyButtonClick: (product: Product) => void;
  products: Product[];
}>;

export function ProductsList({className, onBuyButtonClick, products}: ProductsListProps): JSX.Element {
  const containerClassName = classNames('cards catalog__cards', className);

  return (
    <div className={containerClassName} data-testid={PRODUCTS_LIST_CONTAINER_TEST_ID}>
      {products.map((current) => <ShortProductCard onBuyButtonClick={onBuyButtonClick} product={current} key={current.id}/>)}
    </div>
  );
}
