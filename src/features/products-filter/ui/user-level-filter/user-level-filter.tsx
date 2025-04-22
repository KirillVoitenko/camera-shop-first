import { BaseFilterProps } from '@features/products-filter/model/types';
import { JSX } from 'react';
import { FilterFieldsetTestId } from '@features/products-filter/config/const';

type UserLevelFilterProps = BaseFilterProps;

export function UserLevelFilter({ register }: UserLevelFilterProps): JSX.Element {
  return (
    <fieldset className='catalog-filter__block' data-testid={FilterFieldsetTestId.Level}>
      <legend className='title title--h5'>
        Уровень
      </legend>
      <div className='custom-checkbox catalog-filter__item'>
        <label>
          <input
            type='checkbox'
            {...register('hasBeginnerLevel')}
          />
          <span className='custom-checkbox__icon' />
          <span className='custom-checkbox__label'>
            Нулевой
          </span>
        </label>
      </div>
      <div className='custom-checkbox catalog-filter__item'>
        <label>
          <input
            type='checkbox'
            {...register('hasAmateurLevel')}
          />
          <span className='custom-checkbox__icon' />
          <span className='custom-checkbox__label'>
            Любительский
          </span>
        </label>
      </div>
      <div className='custom-checkbox catalog-filter__item'>
        <label>
          <input
            type='checkbox'
            {...register('hasProfessionalLevel')}
          />
          <span className='custom-checkbox__icon' />
          <span className='custom-checkbox__label'>
            Профессиональный
          </span>
        </label>
      </div>
    </fieldset>
  );
}
