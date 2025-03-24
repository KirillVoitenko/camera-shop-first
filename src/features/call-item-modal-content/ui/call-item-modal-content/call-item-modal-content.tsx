import { Product } from '@entities/product';
import { Classed } from '@shared/model/style-types';
import { JSX } from 'react';
import { BasketProductCard } from '@entities/product';
import { moneyFormat } from '@shared/lib/format';
import { ElementSize } from '@shared/model/html';
import MaskedInput from 'react-input-mask';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from '@features/call-item-modal-content/config/validation';
import { CallFormValue } from '@features/call-item-modal-content/model/types';
import { PHONE_MASK } from '@features/call-item-modal-content/config/const';
import { Order } from '@entities/order';
import { createOrderByFormData } from '@features/call-item-modal-content/lib/create-order';
import classNames from 'classnames';

type CallItemModalContentProps = Classed<{
  product: Product;
  onCreateOrder: (order: Order) => Promise<void>;
}>;

const REQUIRED_ICON_SIZE: ElementSize = {
  width: 9,
  height: 9
};

const SUBMIT_ICON_SIZE: ElementSize = {
  width: 24,
  height: 16
};

export function CallItemModalContent({ product, className, onCreateOrder }: CallItemModalContentProps): JSX.Element {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { isValid, isSubmitting, errors },
    resetField
  } = useForm<CallFormValue>({
    defaultValues: {
      tel: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(validationSchema)
  });

  const formSubmitHandler = async (data: CallFormValue) => {
    await onCreateOrder(createOrderByFormData(product, data));
    clearErrors();
    resetField('tel');
  };

  const getInputStyles = (isError: boolean) => classNames(
    'custom-input',
    'form-review__item',
    {
      'is-invalid': isError
    }
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className={className} onSubmit={handleSubmit(formSubmitHandler)}>
      <BasketProductCard
        product={product}
        className='basket-item--short'
      >
        <p className='basket-item__price'>
          <span className='visually-hidden'>Цена:</span>
          {moneyFormat(product.price)}
        </p>
      </BasketProductCard>
      <div className={getInputStyles(!!errors?.tel?.message)}>
        <label>
          <span className='custom-input__label'>
            Телефон
            <svg width={REQUIRED_ICON_SIZE.width} height={REQUIRED_ICON_SIZE.height} aria-hidden>
              <use xlinkHref='#icon-snowflake' />
            </svg>
          </span>
          <MaskedInput
            type='tel'
            mask={PHONE_MASK}
            placeholder='Введите ваш номер'
            {...register('tel')}
          />
        </label>
        <p className='custom-input__error'>
          {errors?.tel?.message ? errors.tel.message : ''}
        </p>
      </div>
      <div className='modal__buttons'>
        <button className='btn btn--purple modal__btn modal__btn--fit-width' type='submit' disabled={!(isValid || isSubmitting)}>
          <svg width={SUBMIT_ICON_SIZE.width} height={SUBMIT_ICON_SIZE.height} aria-hidden>
            <use xlinkHref='#icon-add-basket' />
          </svg>
          Заказать
        </button>
      </div>
    </form>
  );
}
