import { JSX } from 'react';
import { SOCIALS_LIST_TEST_ID } from '../../config/const';
import { SOCIALS_NAVIGATION_CONFIG } from '../../config/navigation';
import { SvgIcon } from '@shared/ui/svg-icon';

export function SocialsList(): JSX.Element {
  return (
    <ul className='social' data-testid={SOCIALS_LIST_TEST_ID}>
      {SOCIALS_NAVIGATION_CONFIG.map((current) => (
        <li className='social__item' key={current.id}>
          <a className='link' href='#' aria-label={current.label}>
            <SvgIcon size={current.size} xlinkHref={current.iconLink} />
          </a>
        </li>
      ))}
    </ul>
  );
}
