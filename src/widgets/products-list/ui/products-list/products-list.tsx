import { Classed } from '@shared/model/style-types';
import { JSX, useState } from 'react';
import { PRODUCTS_LIST_CONTAINER_TEST_ID } from '@widgets/products-list/config/const';
import classNames from 'classnames';
import { Product, ShortProductCard } from '@entities/product';
import { Nullable } from '@shared/model/utill-types';
import { AddToBasketModalContent, AddToBasketSuccessModalContent, useBasket } from '@features/basket';
import { Modal } from '@shared/ui/modal';

type ProductsListProps = Classed<{
  products: Product[];
}>;

export function ProductsList({ className, products }: ProductsListProps): JSX.Element {
  const { addItem: addToBasket, basket } = useBasket();

  const containerClassName = classNames('cards catalog__cards', className);
  const [buyedProduct, setBuyedProduct] = useState<Nullable<Product>>(null);
  const [addToBasketSuccessModalVisible, setAddToBasketSuccessModalVisible] = useState<boolean>(false);

  const closeAddToBasketModalHandler = () => setBuyedProduct(null);
  const closeAddToBasketSuccessModalHandler = () => setAddToBasketSuccessModalVisible(false);

  const buyButtonClickHandler = (product: Product) => {
    setBuyedProduct(product);
  };

  const addToBasketClickHandler = (productId: number) => {
    closeAddToBasketModalHandler();
    setAddToBasketSuccessModalVisible(true);
    addToBasket(productId);
  };

  return (
    <>
      <div className={containerClassName} data-testid={PRODUCTS_LIST_CONTAINER_TEST_ID}>
        {products.map((current) => (
          <ShortProductCard
            onBuyButtonClick={buyButtonClickHandler}
            product={current} key={current.id}
            inBasketProduct={!!basket.find((basketItem) => basketItem.productId === current.id)}
          />
        ))}
      </div>
      <Modal
        isOpened={!!buyedProduct}
        onClose={closeAddToBasketModalHandler}
      >
        {!!buyedProduct && <AddToBasketModalContent product={buyedProduct} onAddToBasketButtonClick={addToBasketClickHandler} />}
      </Modal>
      <Modal
        className='modal--narrow'
        isOpened={addToBasketSuccessModalVisible}
        onClose={closeAddToBasketSuccessModalHandler}
      >
        <AddToBasketSuccessModalContent onActionClick={closeAddToBasketSuccessModalHandler} />
      </Modal>
    </>
  );
}
