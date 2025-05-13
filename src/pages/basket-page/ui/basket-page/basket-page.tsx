import { PAGE_TITLE } from '@pages/basket-page/config/const';
import { withBrowserTitle } from '@shared/lib/with-browser-title';
import { AppRoutesEnum } from '@shared/model/enums';
import { Layout } from '@shared/ui/layout';
import { JSX } from 'react';

function BasketPage(): JSX.Element {
  return (
    <Layout.Content
      breadcrumbs={
        [
          {
            link: AppRoutesEnum.Main,
            position: 0,
            title: 'Каталог'
          },
          {
            link: AppRoutesEnum.Basket,
            position: 1,
            title: 'Корзина',
            isActive: true
          }
        ]
      }
    >
      <section className='basket'>
        <div className='container'>
          <h1 className='title title--h2'>
            Корзина
          </h1>
        </div>
      </section>
    </Layout.Content>
  );
}

export const BasketWithTitle = withBrowserTitle(BasketPage, PAGE_TITLE);
