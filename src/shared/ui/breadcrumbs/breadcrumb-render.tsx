import { ElementSize } from '@shared/model/html';
import { Breadcrumb } from './types';
import { Link } from 'react-router-dom';
import { SvgIcon } from '../svg-icon';

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
        <SvgIcon size={ARROW_SIZE} xlinkHref='#icon-arrow-mini' />
      </Link>
    )
);
