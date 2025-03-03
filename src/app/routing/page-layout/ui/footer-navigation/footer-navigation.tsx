import { JSX } from 'react';
import { FOOTER_NAVIGATION_TEST_ID, FooterNavigationPartsTestIds } from '../../config/const';
import {
  FooterItemTitle,
  MAIN_NAVIGATION_CONFIG,
  RESOURCES_NAVIGATION_CONFIG,
  SUPPORT_NAVIGATION_CONFIG
} from '../../config/navigation';
import { FooterNavigationItem } from '../footer-navigation-item';
import { Link } from 'react-router-dom';

export function FooterNavigation(): JSX.Element {
  return (
    <ul className='footer__nav' data-testid={FOOTER_NAVIGATION_TEST_ID}>
      <FooterNavigationItem
        items={MAIN_NAVIGATION_CONFIG}
        testId={FooterNavigationPartsTestIds.Main}
        title={FooterItemTitle.Main}
        renderItem={(current) => (
          <li className='footer__item' key={`$main-footer-nav-${current.id}`}>
            <Link className='link' to={current.path}>
              {current.desctription}
            </Link>
          </li>
        )}
      />
      <FooterNavigationItem
        items={RESOURCES_NAVIGATION_CONFIG}
        testId={FooterNavigationPartsTestIds.Resources}
        title={FooterItemTitle.Resources}
        renderItem={(current) => (
          <li className='footer__item' key={`$resources-footer-nav-${current.id}`}>
            <a className='link' href={current.path.toString()}>
              {current.desctription}
            </a>
          </li>
        )}
      />
      <FooterNavigationItem
        items={SUPPORT_NAVIGATION_CONFIG}
        testId={FooterNavigationPartsTestIds.Support}
        title={FooterItemTitle.Support}
        renderItem={(current) => (
          <li className='footer__item' key={`$support-footer-nav-${current.id}`}>
            <a className='link' href={current.path.toString()}>
              {current.desctription}
            </a>
          </li>
        )}
      />
    </ul>
  );
}
