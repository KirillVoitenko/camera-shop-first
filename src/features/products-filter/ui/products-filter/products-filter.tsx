import { isEqualsProductsArray, Product } from '@entities/product';
import { INITIAL_FILTER } from '@features/products-filter/config/const';
import { FilterFormValue } from '@features/products-filter/model/types';
import { Classed } from '@shared/model/style-types';
import classNames from 'classnames';
import { JSX, MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { ErrorOption, useForm } from 'react-hook-form';
import { PriceFilter } from '../price-filter';
import { CategoryFilter } from '../category-filter';
import { CameraTypeFilter } from '../camera-type-filter';
import { UserLevelFilter } from '../user-level-filter';
import { getFilteredProductsInfo } from '@features/products-filter/lib/filter-products';
import { adaptFormValueToFilterValue } from '@features/products-filter/lib/form-value-adapter';
import { debounce } from '@shared/lib/debounce';
import { validateFilterValue } from '@features/products-filter/lib/validate-filter-value';
import { Nullable } from '@shared/model/utill-types';
import { FilteredProductsInfo } from '../../model/types';


type ProductsFilterProps = Classed<{
  products: Product[];
  children: (filteredProducts: Product[]) => JSX.Element;
}>

export function ProductsFilter({
  products,
  className,
  children,
}: ProductsFilterProps): JSX.Element {
  const [filteredProductsInfo, setFilteredProductsInfo] = useState<FilteredProductsInfo>({
    priceLimit: {
      max: null,
      min: null,
    },
    filteredProducts: products
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetFilteredProducts = useCallback(debounce(setFilteredProductsInfo), [setFilteredProductsInfo]);

  const containerClassName = classNames('catalog__aside', className);
  const {
    register,
    resetField,
    watch,
    reset,
    setValue,
  } = useForm<FilterFormValue>({
    defaultValues: INITIAL_FILTER,
  });

  const filterFormValue = watch();

  const filterValue = adaptFormValueToFilterValue(filterFormValue);
  const filterValueValidationResult = validateFilterValue(filterValue, filteredProductsInfo.priceLimit);

  const getFieldError = (field: keyof FilterFormValue): Nullable<ErrorOption> => {
    if (filterValueValidationResult?.errors) {
      if (field in filterValueValidationResult.errors) {
        const fieldError = filterValueValidationResult.errors[field as keyof typeof filterValueValidationResult.errors];
        return fieldError ? fieldError : null;
      }
    }
    return null;
  };

  useEffect(
    () => {
      let componentIsMounted = false;

      if (!componentIsMounted) {
        if (filterValueValidationResult.isValid) {
          debouncedSetFilteredProducts((prev) => {
            const newFilteredProductsInfo = getFilteredProductsInfo(products, filterValue);
            const isEqualsProducts = isEqualsProductsArray(prev.filteredProducts, newFilteredProductsInfo.filteredProducts);
            return isEqualsProducts ? prev : newFilteredProductsInfo;
          });

          return;
        }
      }
      return () => {
        componentIsMounted = true;
      };
    },
    [debouncedSetFilteredProducts, filterValueValidationResult.isValid, filterValue, products]
  );

  const resetButtonClickHandler: MouseEventHandler<HTMLButtonElement> = () => reset();

  return (
    <>
      <div className={containerClassName}>
        <div className='catalog-filter'>
          <form action='#'>
            <h2 className='visually-hidden'>
              Фильтр
            </h2>
            <PriceFilter
              register={register}
              setField={setValue}
              maxPrice={filteredProductsInfo.priceLimit.max}
              minPrice={filteredProductsInfo.priceLimit.min}
              getFieldError={getFieldError}
            />
            <CategoryFilter
              register={register}
            />
            <CameraTypeFilter
              register={register}
              resetField={resetField}
              selectedProductCategory={filterValue.category ? filterValue.category : null}
            />
            <UserLevelFilter
              register={register}
            />
            <button
              className='btn catalog-filter__reset-btn'
              type='reset'
              onClick={resetButtonClickHandler}
            >
              Сбросить фильтры
            </button>
          </form>
        </div>
      </div>
      {children(filteredProductsInfo.filteredProducts)}
    </>
  );
}
