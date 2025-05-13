import { BasketProductCard, Product } from '@entities/product';
import { moneyFormat } from '@shared/lib/format';
import { ElementSize } from '@shared/model/html';
import { Classed } from '@shared/model/style-types';
import { Modal } from '@shared/ui/modal';
import { SvgIcon } from '@shared/ui/svg-icon';
import classNames from 'classnames';
import { JSX, MouseEventHandler } from 'react';

type AddToBasketModalProps = Classed<{
  product: Product;
  onAddToBasketButtonClick: (productId: number) => void;
}>;

const ICON_SIZE: ElementSize = {
  height: 10,
  width: 10
};

export function AddToBasketModalContent({ onAddToBasketButtonClick, product, className}: AddToBasketModalProps): JSX.Element {
  const cardClassName = classNames('basket-item--short', className);
  const addToBasketClickHandler: MouseEventHandler<HTMLButtonElement> = () => onAddToBasketButtonClick(product.id);

  return (
    <Modal.Content title='Добавить товар в корзину'>
      <BasketProductCard className={cardClassName} product={product}>
        <p className='basket-item__price'>
          <span className='visually-hidden'>Цена:</span>
          {moneyFormat(product.price)}
        </p>
      </BasketProductCard>
      <div className='modal__buttons'>
        <button
          className='btn btn--purple modal__btn modal__btn--fit-width'
          type='button'
          onClick={addToBasketClickHandler}
        >
          <SvgIcon
            xlinkHref='#icon-add-basket'
            size={ICON_SIZE}
            testId='add-to-basket-icon'
          />
          Добавить в корзину
        </button>
      </div>
    </Modal.Content>
  );
}
