import { JSX } from 'react';
import { SOCIALS_LIST_TEST_ID } from '../../config/const';
import { SOCIALS_NAVIGATION_CONFIG } from '../../config/navigation';

export function SocialsList(): JSX.Element {
  return (
    <ul className='social' data-testid={SOCIALS_LIST_TEST_ID}>
      {SOCIALS_NAVIGATION_CONFIG.map((current) => (
        <li className='social__item' key={current.id}>
          <a className='link' href='#' aria-label={current.label}>
            <svg width={current.size.width} height={current.size.height} aria-hidden>
              <use xlinkHref={current.iconLink} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
