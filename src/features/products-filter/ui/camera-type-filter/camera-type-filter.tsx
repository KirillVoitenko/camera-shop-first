import { ProductCategory } from '@entities/product';
import { FilterFieldsetTestId } from '@features/products-filter/config/const';
import { BaseFilterProps, FilterFormValue } from '@features/products-filter/model/types';
import { Nullable } from '@shared/model/utill-types';
import { JSX, useEffect } from 'react';
import { UseFormResetField } from 'react-hook-form';

interface CameraTypeFilterProps extends BaseFilterProps {
  selectedProductCategory?: Nullable<ProductCategory>;
  resetField: UseFormResetField<FilterFormValue>;
}

export function CameraTypeFilter({ register, resetField, selectedProductCategory }: CameraTypeFilterProps): JSX.Element {
  useEffect(
    () => {
      if (selectedProductCategory === ProductCategory.VideoCamera) {
        resetField('hasFilmType');
        resetField('hasMomentalType');
      }
    },
    [resetField, selectedProductCategory]
  );

  return (
    <fieldset className='catalog-filter__block' data-testid={FilterFieldsetTestId.Type}>
      <legend className='title title--h5'>
        Тип камеры
      </legend>
      <div className='custom-checkbox catalog-filter__item'>
        <label>
          <input
            type='checkbox'
            {...register('hasDigitalType')}
          />
          <span className='custom-checkbox__icon' />
          <span className='custom-checkbox__label'>
            Цифровая
          </span>
        </label>
      </div>
      <div className='custom-checkbox catalog-filter__item'>
        <label>
          <input
            type='checkbox'
            {...register('hasFilmType', { disabled: selectedProductCategory === ProductCategory.VideoCamera })}
          />
          <span className='custom-checkbox__icon' />
          <span className='custom-checkbox__label'>
            Плёночная
          </span>
        </label>
      </div>
      <div className='custom-checkbox catalog-filter__item'>
        <label>
          <input
            type='checkbox'
            {...register('hasMomentalType', { disabled: selectedProductCategory === ProductCategory.VideoCamera })}
          />
          <span className='custom-checkbox__icon' />
          <span className='custom-checkbox__label'>
            Моментальная
          </span>
        </label>
      </div>
      <div className='custom-checkbox catalog-filter__item'>
        <label>
          <input
            type='checkbox'
            {...register('hasCollectionType')}
          />
          <span className='custom-checkbox__icon' />
          <span className='custom-checkbox__label'>
            Коллекционная
          </span>
        </label>
      </div>
    </fieldset>
  );
}
