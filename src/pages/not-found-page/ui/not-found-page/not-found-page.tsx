import { PAGE_TITLE } from '@pages/not-found-page/config/const';
import { withBrowserTitle } from '@shared/lib/with-browser-title';
import { AppRoutesEnum } from '@shared/model/enums';
import { Layout } from '@shared/ui/layout';
import { JSX } from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  return (
    <Layout.Content
      breadcrumbs={[
        {
          position: 0,
          link: AppRoutesEnum.Main,
          title: '404',
          isActive: true
        }
      ]}
    >
      <div className='container not-found-content'>
        <h1>Запрашиваемой страницы не существует <sup>(404)</sup></h1>
        <Link to={AppRoutesEnum.Main} className='btn btn--purple product-card__btn'>
          На главную
        </Link>
      </div>
    </Layout.Content>
  );
}

export const NotFoundPageWithTitle = withBrowserTitle(NotFoundPage, PAGE_TITLE);
