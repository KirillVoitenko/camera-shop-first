import { ProductCategory } from '@entities/product';
import { FilterFieldsetTestId } from '@features/products-filter/config/const';
import { BaseFilterProps } from '@features/products-filter/model/types';
import { JSX } from 'react';

type CategoryFilterProps = BaseFilterProps;

export function CategoryFilter({ register }: CategoryFilterProps): JSX.Element {
  return (
    <fieldset className='catalog-filter__block' data-testid={FilterFieldsetTestId.Category}>
      <legend className='title title--h5'>
        Категория
      </legend>
      <div className='custom-radio catalog-filter__item'>
        <label>
          <input
            type='radio'
            {...register('category')}
            value={ProductCategory.PhotoCamera}
          />
          <span className='custom-radio__icon' />
          <span className='custom-radio__label'>
              Фотокамера
          </span>
        </label>
      </div>
      <div className='custom-radio catalog-filter__item'>
        <label>
          <input
            type='radio'
            {...register('category')}
            value={ProductCategory.VideoCamera}
          />
          <span className='custom-radio__icon' />
          <span className='custom-radio__label'>
              Видеокамера
          </span>
        </label>
      </div>
    </fieldset>
  );
}
