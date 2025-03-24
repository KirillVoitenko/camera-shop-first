import { useAppSelector } from '@shared/lib/store';
import { RootState } from '@shared/model/redux';
import { Spinner } from '@shared/ui/spinner';
import classNames from 'classnames';
import { JSX } from 'react';

type Selector = (state: RootState) => boolean;

type GlobalLoaderProps = {
  className?: string;
  productListLoadingSelector: Selector;
  productPageLoadingSelector: Selector;
  basketLoadingSelector: Selector;
}

export function GlobalLoader({
  className,
  productListLoadingSelector,
  productPageLoadingSelector,
  basketLoadingSelector,
}: GlobalLoaderProps): JSX.Element {
  const productsLoading = useAppSelector(productListLoadingSelector);
  const productPageLoading = useAppSelector(productPageLoadingSelector);
  const basketLoading = useAppSelector(basketLoadingSelector);
  const loading = productsLoading || productPageLoading || basketLoading;

  const loaderClassName = classNames(
    'loader-container',
    {
      'loader-container--active': loading,
    },
    className
  );
  return (
    <div className={loaderClassName} data-testid='global-loader-container'>
      <Spinner isActive={loading} />
    </div>
  );
}
