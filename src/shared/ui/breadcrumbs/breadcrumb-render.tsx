import { ElementSize } from '@shared/model/html';
import { Breadcrumb } from './types';
import { Link } from 'react-router-dom';

const ARROW_SIZE: ElementSize = {
  height: 8,
  width: 5,
};

export const breadcrumbRender = (crumb: Breadcrumb): JSX.Element => (
  crumb?.isActive
    ? (
      <span className='breadcrumbs__link breadcrumbs__link--active'>
        {crumb.title}
      </span>
    )
    : (
      <Link
        to={crumb.link}
        className='breadcrumbs__link'
      >
        {crumb.title}
        <svg width={ARROW_SIZE.width} height={ARROW_SIZE.height} aria-hidden>
          <use xlinkHref='#icon-arrow-mini' />
        </svg>
      </Link>
    )
);
