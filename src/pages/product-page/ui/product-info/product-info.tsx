import { FullProductCard, Product } from '@entities/product';
import { JSX, useState } from 'react';
import { SimilarProducts } from '../similar-products';
import { Nullable } from '@shared/model/utill-types';
import { Modal } from '@shared/ui/modal';
import { CallItemModalContent } from '@features/call-item-modal-content';

type ProductInfoProps = {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps): JSX.Element {
  const [buyedProduct, setBuyedProduct] = useState<Nullable<Product>>(null);
  return (
    <>
      <div className='page-content__section'>
        <FullProductCard product={product} onBuyButtonClick={setBuyedProduct} />
      </div>
      <SimilarProducts onBuyButtonClick={setBuyedProduct} />
      <Modal
        isOpened={!!buyedProduct}
        onClose={() => setBuyedProduct(null)}
      >
        {!!buyedProduct && (
          <Modal.Content title='Свяжитесь со мной'>
            <CallItemModalContent product={product} />
          </Modal.Content>
        )}
      </Modal>
    </>
  );
}
