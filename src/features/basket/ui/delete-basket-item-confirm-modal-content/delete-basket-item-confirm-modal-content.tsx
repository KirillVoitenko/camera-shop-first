import { BasketProductCard, Product } from '@entities/product';
import { Modal } from '@shared/ui/modal';
import { JSX } from 'react';

type DeleteBasketItemConfirmModalContentProps = {
  product: Product;
  onConfirmDeleting: (productId: number) => void;
  onEscapeDeleting: () => void;
}

export function DeleteBasketItemConfirmModalContent({
  product,
  onConfirmDeleting,
  onEscapeDeleting
}: DeleteBasketItemConfirmModalContentProps): JSX.Element {
  const confirmDeletingHandler = () => onConfirmDeleting(product.id);
  const escapeDeletingHandler = () => onEscapeDeleting();

  return (
    <Modal.Content title='Удалить этот товар?'>
      <BasketProductCard
        className='basket-item--short'
        product={product}
      />
      <div className='modal__buttons'>
        <button
          className='btn btn--purple modal__btn modal__btn--half-width'
          type='button'
          onClick={confirmDeletingHandler}
        >
          Удалить
        </button>
        <button
          className='btn btn--transparent modal__btn modal__btn--half-width'
          type='button'
          onClick={escapeDeletingHandler}
        >
          Продолжить покупки
        </button>
      </div>
    </Modal.Content>
  );
}
