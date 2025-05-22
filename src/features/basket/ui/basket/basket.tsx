import { JSX, useState } from 'react';
import { useBasket } from '@features/basket/lib/use-basket';
import { Classed } from '@shared/model/style-types';
import { useAppSelector } from '@shared/lib/store';
import { productsDataSelector } from '@entities/product';
import { ProductInBasket } from '@features/basket/model/types';
import { BasketItem } from '../basket-item';
import classNames from 'classnames';
import { Modal } from '@shared/ui/modal';
import { DeleteBasketItemConfirmModalContent } from '../delete-basket-item-confirm-modal-content';

const NOT_EXISTS_ITEM_ID = -1;

type BasketProps = Classed<Record<string, never>>;

export function Basket({ className }: BasketProps): JSX.Element {
  const allProducts = useAppSelector(productsDataSelector);
  const [deletingItemId, setDeletingItemId] = useState(NOT_EXISTS_ITEM_ID);

  const escapeDeletingItemHandler = () => setDeletingItemId(NOT_EXISTS_ITEM_ID);

  const deleteButtonClickHandler = (itemId: number) => {
    setDeletingItemId(itemId);
  };

  const { basket, deleteItem } = useBasket();

  const deleteItemConfirmHandler = (itemId: number) => {
    deleteItem(itemId);
    setDeletingItemId(NOT_EXISTS_ITEM_ID);
  };

  const adaptedBasketInfo: ProductInBasket[] = basket.map((current) => ({
    count: current.count,
    product: allProducts.find((product) => product.id === current.productId)
  } as ProductInBasket)).filter((item) => !!item.product);

  const deletingProduct = adaptedBasketInfo.find((current) => current.product.id === deletingItemId);

  const basketListClassName = classNames('basket__list', className);

  return adaptedBasketInfo.length > 0
    ? (
      <>
        <ul className={basketListClassName}>
          {adaptedBasketInfo.map((current) => (
            <BasketItem
              key={`basket-list-product-${current.product.id}`}
              item={current}
              onDeleteItem={deleteButtonClickHandler}
            />
          ))}
        </ul>
        <Modal
          isOpened={deletingItemId !== NOT_EXISTS_ITEM_ID}
          onClose={escapeDeletingItemHandler}
        >
          {deletingProduct &&
            <DeleteBasketItemConfirmModalContent
              product={deletingProduct.product}
              onConfirmDeleting={deleteItemConfirmHandler}
              onEscapeDeleting={escapeDeletingItemHandler}
            />}
        </Modal>
      </>
    )
    : (
      <p>
        Корзина пуста, исправьте это заказав что-нибудь.
      </p>
    );
}
