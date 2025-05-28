import { JSX } from 'react';
import { OrderStatus } from '@entities/order/model/types';
import { Modal } from '@shared/ui/modal';
import { Nullable } from '@shared/model/utill-types';
import { SvgIcon } from '@shared/ui/svg-icon';
import { ElementSize } from '@shared/model/html';

type CreateOrderResultModalContentProps = {
  status: OrderStatus;
  onToBasketClick: () => void;
  onToProductListClick: () => void;
};

const SUCCESS_ICON_SIZE: ElementSize = {
  height: 78,
  width: 80,
};

const ERROR_ICON_SIZE: ElementSize = {
  height: 83,
  width: 85,
};

type ModalContentConfig = {
  title: string;
  icon: string;
  iconSize: ElementSize;
  resolution?: Nullable<string>;
}

export function CreateOrderResultModalContent({ status, onToBasketClick, onToProductListClick }: CreateOrderResultModalContentProps): JSX.Element {
  const config: ModalContentConfig = status.status === 'error'
    ? {
      icon: '#error-icon',
      title: 'Ошибка при создании заказа',
      resolution: status.resolution,
      iconSize: ERROR_ICON_SIZE
    } : {
      icon: '#icon-review-success',
      title: 'Спасибо за покупку',
      iconSize: SUCCESS_ICON_SIZE
    };

  return (
    <Modal.Content title={config.title}>
      <SvgIcon
        className='modal__icon'
        size={config.iconSize}
        xlinkHref={config.icon}
        isAriaHidden={false}
        testId='order-result-icon'
      />
      {config?.resolution &&
        <p>
          {config.resolution}
        </p>}
      <div className='modal__buttons'>
        {status.status === 'error' && (
          <button
            onClick={onToBasketClick}
            className='btn btn--transparent modal__btn'
          >
            В корзину
          </button>
        )}
        <button
          onClick={onToProductListClick}
          className='btn btn--purple modal__btn modal__btn--fit-width'
        >
          Вернуться к покупкам
        </button>
      </div>
    </Modal.Content>
  );
}
