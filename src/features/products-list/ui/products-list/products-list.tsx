import { Classed } from '@shared/model/style-types';
import { JSX } from 'react';
import { PRODUCTS_LIST_CONTAINER_TEST_ID } from '@features/products-list/config/const';
import classNames from 'classnames';
import { Product, productsDataSelector, ShortProductCard } from '@entities/product';
import { useAppSelector } from '@shared/lib/store';

type ProductsListProps = Classed<{
  onBuyButtonClick: (product: Product) => void;
}>;

export function ProductsList({className, onBuyButtonClick}: ProductsListProps): JSX.Element {
  const containerClassName = classNames('cards catalog__cards', className);
  const products = useAppSelector(productsDataSelector);

  return (
    <div className={containerClassName} data-testid={PRODUCTS_LIST_CONTAINER_TEST_ID}>
      {products.map((current) => <ShortProductCard onBuyButtonClick={onBuyButtonClick} product={current} key={current.id}/>)}
    </div>
  );
}
