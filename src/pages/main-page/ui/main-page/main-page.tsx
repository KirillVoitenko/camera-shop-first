import { Layout } from '@shared/ui/layout';
import { withBrowserTitle } from '@shared/lib/with-browser-title';
import { PAGE_TITLE } from '@pages/main-page/config/const';
import { ProductsList } from '@features/products-list';
import { Modal } from '@shared/ui/modal';
import { useState } from 'react';
import { Nullable } from '@shared/model/utill-types';
import { Product } from '@entities/product';
import { AppRoutesEnum } from '@shared/model/enums';
import { Banner } from '../banner';
import { CallItemModalContent } from '@features/call-item-modal-content';

function MainPage() {
  const [buyedProduct, setBuyedProduct] = useState<Nullable<Product>>(null);
  const closeModalHandler = () => setBuyedProduct(null);

  const buyButtonClickHandler = (product: Product) => {
    setBuyedProduct(product);
  };

  return (
    <Layout.Content
      breadcrumbs={[
        {
          link: AppRoutesEnum.Main,
          position: 0,
          title: 'Каталог',
          isActive: true
        }
      ]}
    >
      <section className='catalog'>
        <div className='container'>
          <h1 className='title title--h2'>Каталог фото- и видеотехники</h1>
          <div className='page-content__columns'>
            <Banner />
            <div className='catalog__content'>
              <ProductsList onBuyButtonClick={buyButtonClickHandler} />
            </div>
          </div>
        </div>
      </section>
      <Modal
        isOpened={!!buyedProduct}
        onClose={closeModalHandler}
      >
        <Modal.Content title='Свяжитесь со мной'>
          {!!buyedProduct && <CallItemModalContent product={buyedProduct} />}
        </Modal.Content>
      </Modal>
    </Layout.Content>
  );
}

export const MainPageWithTitle = withBrowserTitle(MainPage, PAGE_TITLE);
