import { JSX } from 'react';
import { HEADER_NAVIGATION_TEST_ID } from '../../config/const';
import { MAIN_NAVIGATION_CONFIG } from '../../config/navigation';
import { Link } from 'react-router-dom';

export function HeaderNavigation(): JSX.Element {
  return (
    <nav className='main-nav header__main-nav' data-testid={HEADER_NAVIGATION_TEST_ID}>
      <ul className='main-nav__list'>
        {MAIN_NAVIGATION_CONFIG.map((current) => (
          <li className='main-nav__item' key={current.id}>
            <Link to={current.path} className='main-nav__link'>
              {current.desctription}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
