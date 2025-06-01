import { useBasket } from '@features/basket/lib/use-basket';
import { Classed } from '@shared/model/style-types';
import classNames from 'classnames';
import { ChangeEventHandler, FormEventHandler, JSX, useState } from 'react';

type BasketPromoProps = Classed<Record<string, never>>;

export function BasketPromo({ className }: BasketPromoProps): JSX.Element {
  const containerClassName = classNames('basket__promo', className);

  const {
    applyCoupon,
    coupon,
    clearCoupon
  } = useBasket();
  const [promoValue, setPromoValue] = useState<string>(coupon.data?.coupon ?? '');

  const promoInputChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (coupon.status === 'error' || !!coupon.data?.coupon) {
      clearCoupon();
    }
    setPromoValue(event.target.value.trim());
  };

  const couponSubmitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    applyCoupon(promoValue.trim());
  };

  const isAppliedPromo = coupon.status === 'success' && !!coupon.data.coupon;

  const inputClassName = classNames(
    'custom-input',
    {
      'is-invalid': coupon.status === 'error',
      'is-valid': isAppliedPromo
    }
  );

  return (
    <div className={containerClassName}>
      <p className='title title--h4'>
        Если у вас есть промокод на скидку, примените его в этом поле
      </p>
      <div className='basket-form'>
        <form onSubmit={couponSubmitHandler}>
          <div className={inputClassName}>
            <label>
              <span className='custom-input__label'>Промокод</span>
              <input
                type='text'
                name='promo'
                placeholder='Введите промокод'
                value={promoValue}
                onChange={promoInputChangeHandler}
              />
            </label>
            {isAppliedPromo && (
              <p className='custom-input__success'>
                Промокод принят!
              </p>
            )}
            {(coupon.status === 'error') && (
              <p className='custom-input__error'>
                Промокод неверный!
              </p>
            )}
          </div>
          <button
            className='btn'
            type='submit'
            disabled={isAppliedPromo}
          >
            Применить
          </button>
        </form>
      </div>
    </div>
  );
}
