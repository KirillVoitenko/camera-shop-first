import { FullProductCard, Product } from '@entities/product';
import { JSX, useState } from 'react';
import { SimilarProducts } from '../similar-products';
import { Nullable } from '@shared/model/utill-types';
import { Modal } from '@shared/ui/modal';
import { CallItemModalContent } from '@features/call-item-modal-content';
import { createOrderFetchAction } from '@entities/order';
import { useAsyncThunkDispatch } from '@shared/lib/store/use-async-thunk-dispatch';
import { TOAST_CONTAINER_ID } from '@shared/ui/toast-container';
import { toast } from 'react-toastify';

type ProductInfoProps = {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps): JSX.Element {
  const [buyedProduct, setBuyedProduct] = useState<Nullable<Product>>(null);

  const dispatchCreateOrderAction = useAsyncThunkDispatch(
    createOrderFetchAction,
    () => {
      setBuyedProduct(null);
      toast.success('Заказ успешно сформирован', { containerId: TOAST_CONTAINER_ID });
    },
    () => {
      toast.error('Не удалось создать заказ', { containerId: TOAST_CONTAINER_ID });
    }
  );

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
            <CallItemModalContent product={product} onCreateOrder={dispatchCreateOrderAction} />
          </Modal.Content>
        )}
      </Modal>
    </>
  );
}
