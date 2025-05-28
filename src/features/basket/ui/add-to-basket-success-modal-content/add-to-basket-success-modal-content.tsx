import { AppRoutesEnum } from '@shared/model/enums';
import { ElementSize } from '@shared/model/html';
import { Modal } from '@shared/ui/modal';
import { SvgIcon } from '@shared/ui/svg-icon';
import { JSX } from 'react';
import { Link } from 'react-router-dom';

const ICON_SIZE: ElementSize = {
  height: 80,
  width: 86
};

type AddToBasketSuccessModalContentProps = {
  onBasketLinkClick: () => void;
  onContinueBuy: () => void;
}

export function AddToBasketSuccessModalContent({ onBasketLinkClick, onContinueBuy }: AddToBasketSuccessModalContentProps): JSX.Element {
  return (
    <Modal.Content
      title='Товар успешно добавлен в корзину'
    >
      <SvgIcon
        size={ICON_SIZE}
        xlinkHref='#icon-success'
        className='modal__icon'
        testId='add-success-icon'
      />
      <div className='modal__buttons'>
        <button
          onClick={onContinueBuy}
          type='button'
          className='btn btn--transparent modal__btn'
        >
          Продолжить покупки
        </button>
        <Link
          className='btn btn--purple modal__btn modal__btn--fit-width'
          onClick={onBasketLinkClick}
          to={AppRoutesEnum.Basket}
        >
          Перейти в корзину
        </Link>
      </div>
    </Modal.Content>
  );
}
