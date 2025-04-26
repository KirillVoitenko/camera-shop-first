import { Product } from '@entities/product';
import { Classed } from '@shared/model/style-types';
import classNames from 'classnames';
import { ChangeEventHandler, JSX } from 'react';
import { ProductsSortingValue } from '@features/products-sorting/model/types';
import { sortProducts } from '@features/products-sorting/lib/sorting-functions';
import { SvgIcon } from '@shared/ui/svg-icon';
import { INITIAL_SORTING, SORTING_CONTAINER_TEST_ID, SortRadioTestId, VECTOR_SORTING_ICON_SIZE } from '@features/products-sorting/config/const';
import { usePageSearchParams } from '@shared/lib/use-page-search-params';
import {
  convertSortingParamsToUrlSearchParams,
  convertUrlSearchParamsToSortingParams
} from '@features/products-sorting/lib/sorting-page-params-converter';

type ProductsSortingProps = Classed<{
  products: Product[];
  children: (sortedProducts: Product[]) => JSX.Element;
}>

export function ProductsSorting({ children, products, className }: ProductsSortingProps): JSX.Element {
  const {getPageSearchParams, changePageSearchParams} = usePageSearchParams(
    INITIAL_SORTING,
    convertSortingParamsToUrlSearchParams,
    convertUrlSearchParamsToSortingParams
  );

  const containerClassName = classNames('catalog-sort', className);

  const sortingValue = getPageSearchParams();

  const formChangeHandler = <TFormField extends keyof ProductsSortingValue>(field: TFormField, value: ProductsSortingValue[TFormField]) => {
    changePageSearchParams({
      ...sortingValue,
      [field]: value});
  };

  const formRadioChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const fieldName = event.target.name as keyof ProductsSortingValue;
    const fieldValue = event.target.value as ProductsSortingValue[typeof fieldName];

    if (event.target.checked) {
      formChangeHandler(fieldName, fieldValue);
    }
  };

  return (
    <>
      <div className={containerClassName} data-testid={SORTING_CONTAINER_TEST_ID}>
        <form action='#'>
          <div className='catalog-sort__inner'>
            <p className='title title--h5'>Сортировать:</p>
            <div className='catalog-sort__type'>
              <div className='catalog-sort__btn-text'>
                <input
                  type='radio'
                  id='sortPrice'
                  name='type'
                  value='PRICE'
                  checked={sortingValue.type === 'PRICE'}
                  onChange={formRadioChangeHandler}
                  data-testid={SortRadioTestId.Price}
                />
                <label htmlFor='sortPrice'>по цене</label>
              </div>
              <div className='catalog-sort__btn-text'>
                <input
                  type='radio'
                  id='sortPopular'
                  name='type'
                  value='POPULAR'
                  onChange={formRadioChangeHandler}
                  checked={sortingValue.type === 'POPULAR'}
                  data-testid={SortRadioTestId.Rating}
                />
                <label htmlFor='sortPopular'>по популярности</label>
              </div>
            </div>
            <div className='catalog-sort__order'>
              <div className='catalog-sort__btn catalog-sort__btn--up'>
                <input
                  type='radio'
                  id='up'
                  name='vector'
                  value='UP'
                  checked={sortingValue.vector === 'UP'}
                  aria-label='По возрастанию'
                  onChange={formRadioChangeHandler}
                  data-testid={SortRadioTestId.SortUp}
                />
                <label htmlFor='up'>
                  <SvgIcon
                    size={VECTOR_SORTING_ICON_SIZE}
                    xlinkHref='#icon-sort'
                  />
                </label>
              </div>
              <div className='catalog-sort__btn catalog-sort__btn--down'>
                <input
                  type='radio'
                  id='down'
                  name='vector'
                  value='DOWN'
                  checked={sortingValue.vector === 'DOWN'}
                  aria-label='По убыванию'
                  onChange={formRadioChangeHandler}
                  data-testid={SortRadioTestId.SortDown}
                />
                <label htmlFor='down'>
                  <SvgIcon
                    size={VECTOR_SORTING_ICON_SIZE}
                    xlinkHref='#icon-sort'
                  />
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
      {children(sortProducts(products, sortingValue))}
    </>
  );
}
