import { FilterFieldsetTestId } from '@features/products-filter/config/const';
import { BaseFilterProps, FilterFormValue } from '@features/products-filter/model/types';
import { Nullable } from '@shared/model/utill-types';
import classNames from 'classnames';
import { FocusEventHandler, JSX } from 'react';
import {
  ErrorOption,
  UseFormRegister,
  UseFormRegisterReturn,
  UseFormSetValue
} from 'react-hook-form';


interface PriceFilterProps extends BaseFilterProps {
  minPrice: Nullable<number>;
  maxPrice: Nullable<number>;
  setField: UseFormSetValue<FilterFormValue>;
  getFieldError: (field: keyof FilterFormValue) => Nullable<ErrorOption>;
}

type CustomizedUseFormRegisterReturn<
  TFieldName extends string
> = Omit<UseFormRegisterReturn<TFieldName>, 'onBlur'> & {
  onBlur: FocusEventHandler<HTMLInputElement>;
}

const withPriceInputRegister = (register: UseFormRegister<FilterFormValue>, customOnBlur: FocusEventHandler<HTMLInputElement>) =>
  (...[name, options]: Parameters<typeof register>): CustomizedUseFormRegisterReturn<typeof name> => {
    const { onBlur: onBlurBase, ...otherRegister } = register(name, options);

    return {
      ...otherRegister,
      onBlur: (event) => {
        customOnBlur(event);
        onBlurBase(event);
      }
    };
  };

export function PriceFilter({ register, minPrice, maxPrice, setField, getFieldError }: PriceFilterProps): JSX.Element {
  const priceInputBlurHandler: FocusEventHandler<HTMLInputElement> = (event) => {
    const inputName = event.target.name;
    const priceValue = Number.parseFloat(event.target.value);

    if (!Number.isNaN(priceValue)) {
      switch(inputName) {
        case 'priceBegin': {
          if (minPrice && priceValue < minPrice) {
            setField(inputName, String(minPrice));
          }
          break;
        }
        case 'priceEnd': {
          if (maxPrice && priceValue > maxPrice) {
            setField(inputName, String(maxPrice));
          }
          break;
        }
      }
    }
  };

  const priceInputRegister = withPriceInputRegister(register, priceInputBlurHandler);

  const priceBeginValidationError = getFieldError('priceBegin');
  const priceEndValidationError = getFieldError('priceEnd');

  const priceBeginInputClassName = classNames('custom-input', { 'is-invalid': !!priceBeginValidationError });
  const priceEndInputClassName = classNames('custom-input', { 'is-invalid': !!priceEndValidationError });
  return (
    <fieldset className='catalog-filter__block' data-testid={FilterFieldsetTestId.Price}>
      <legend className='title title__h5'>
        Цена, ₽
      </legend>
      <div className='catalog-filter__price-range'>
        <div className={priceBeginInputClassName}>
          <label>
            <input
              placeholder={`${minPrice ?? 'от'}`.trim()}
              {
                ...priceInputRegister('priceBegin')
              }
            />
            {priceBeginValidationError?.message &&
              <span className='custom-input__error filter-price-error-message'>
                {priceBeginValidationError.message}
              </span>}
          </label>
        </div>
        <div className={priceEndInputClassName}>
          <label>
            <input
              placeholder={`${maxPrice ?? 'до'}`.trim()}
              {
                ...priceInputRegister('priceEnd')
              }
            />
            {priceEndValidationError?.message &&
              <span className='custom-input__error filter-price-error-message'>
                {priceEndValidationError.message}
              </span>}
          </label>
        </div>
      </div>
    </fieldset>
  );
}
