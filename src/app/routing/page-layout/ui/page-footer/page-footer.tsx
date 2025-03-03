import { Layout } from '@shared/ui/layout';
import { JSX } from 'react';
import { PAGE_FOOTER_TEST_ID } from '../../config/const';
import { Logo } from '@shared/ui/logo';
import { SocialsList } from '../socials-list';
import { FooterNavigation } from '../footer-navigation';

export function PageFooter(): JSX.Element {
  return (
    <Layout.Footer>
      <div className='container' data-testid={PAGE_FOOTER_TEST_ID}>
        <div className='footer__info'>
          <Logo type='footer' />
          <p className='footer__description'>
            Интернет-магазин фото- и видеотехники
          </p>
          <SocialsList />
        </div>
        <FooterNavigation />
      </div>
    </Layout.Footer>
  );
}
