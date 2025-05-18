import { FullProductCard, Product } from '@entities/product';
import { JSX, useState } from 'react';
import { SimilarProducts } from '../similar-products';
import { Nullable } from '@shared/model/utill-types';
import { Modal } from '@shared/ui/modal';
import {
  useBasket,
  AddToBasketModalContent,
  AddToBasketSuccessModalContent
} from '@features/basket';

type ProductInfoProps = {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps): JSX.Element {
  const { addItem: addToBasket } = useBasket();

  const [buyedProduct, setBuyedProduct] = useState<Nullable<Product>>(null);
  const [addToBasketSuccessModalVisible, setAddToBasketSuccessModalVisible] = useState<boolean>(false);

  const closeAddToBasketModalHandler = () => setBuyedProduct(null);
  const closeAddToBasketSuccessModalHandler = () => setAddToBasketSuccessModalVisible(false);

  const buyButtonClickHandler = (productByBuy: Product) => {
    setBuyedProduct(productByBuy);
  };

  const addToBasketClickHandler = (productId: number) => {
    closeAddToBasketModalHandler();
    setAddToBasketSuccessModalVisible(true);
    addToBasket(productId);
  };

  return (
    <>
      <div className='page-content__section'>
        <FullProductCard product={product} onBuyButtonClick={buyButtonClickHandler} />
      </div>
      <SimilarProducts onBuyButtonClick={buyButtonClickHandler} />
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
