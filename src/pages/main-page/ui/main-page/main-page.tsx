import { Layout } from '@shared/ui/layout';
import { withBrowserTitle } from '@shared/lib/with-browser-title';
import { PAGE_TITLE } from '@pages/main-page/config/const';
import { AppRoutesEnum } from '@shared/model/enums';
import { PromosSlider } from '../promos-slider';
import { Catalog } from '@widgets/catalog';
import { ProductsList } from '@widgets/products-list';

function MainPage() {
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
      subHeader={<PromosSlider />}
    >
      <section className='catalog'>
        <div className='container'>
          <h1 className='title title--h2'>Каталог фото- и видеотехники</h1>
          <div className='page-content__columns'>
            <Catalog
              renderProductsList={(products) => <ProductsList products={products}/>}
            />
          </div>
        </div>
      </section>
    </Layout.Content>
  );
}

export const MainPageWithTitle = withBrowserTitle(MainPage, PAGE_TITLE);
