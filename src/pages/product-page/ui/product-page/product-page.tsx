import { withBrowserTitle } from '@shared/lib/with-browser-title';
import { PAGE_TITLE } from '@pages/product-page/config/const';
import { JSX, useEffect } from 'react';
import { generatePath, useParams } from 'react-router-dom';
import { Layout } from '@shared/ui/layout';
import { useAppDispatch, useAppSelector } from '@shared/lib/store';
import { fetchProductAction } from '@pages/product-page/model/product-slice';
import { productDataSelector } from '@pages/product-page/model/product-slice';
import { AppRoutesEnum } from '@shared/model/enums';
import { CommentsList } from '../comments-list';
import { ScrollupLink } from '@shared/ui/scrollup-link';
import { ProductInfo } from '../product-info';

type PageParams = {
  productId: string;
}

function ProductPage(): JSX.Element {
  const { productId } = useParams<PageParams>();
  const dispatch = useAppDispatch();
  const product = useAppSelector(productDataSelector);

  useEffect(
    () => {
      let isMounted = false;

      const fetchProduct = async () => {
        if (!isMounted && !Number.isNaN(productId)) {
          await dispatch(fetchProductAction({ cameraId: Number(productId) }));
        }
      };

      fetchProduct();

      return () => {
        isMounted = true;
      };
    },
    [dispatch, productId]
  );

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {product && (
        <>
          <Layout.Content
            breadcrumbs={[
              {
                link: AppRoutesEnum.Main,
                position: 0,
                title: 'Каталог'
              },
              {
                link: generatePath(AppRoutesEnum.Product, { productId: String(productId) }),
                position: 1,
                title: product.name,
                isActive: true
              }
            ]}
          >
            <ProductInfo product={product}/>
            <div className='page-content__section'>
              <section className='review-block'>
                <div className='container'>
                  <CommentsList productId={product.id} />
                </div>
              </section>
            </div>
          </Layout.Content>
          <ScrollupLink elementId='#header'/>
        </>
      )}
    </>
  );
}

export const ProductPageWithTitle = withBrowserTitle(ProductPage, PAGE_TITLE);
