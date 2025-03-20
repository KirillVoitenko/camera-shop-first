import { Classed } from '@shared/model/style-types';
import { JSX } from 'react';
import { Breadcrumb } from './types';
import { breadcrumbRender } from './breadcrumb-render';
import classNames from 'classnames';
import { AppRoutesEnum } from '@shared/model/enums';

type BreadcrumbsProps = Classed<{
  crumbs?: Breadcrumb[];
  renderItem?: (crumb: Breadcrumb) => JSX.Element;
}>;

const mainCrumb: Breadcrumb = {
  link: AppRoutesEnum.Main,
  position: -1,
  title: 'Главная',
};

export function Breadcrumbs({ className, crumbs = [], renderItem = breadcrumbRender }: BreadcrumbsProps): JSX.Element {
  const containerClassName = classNames('breadcrumbs', className);
  const sortedCrumbs = [mainCrumb, ...crumbs].sort((first, second) => first.position - second.position);
  return (
    <div className={containerClassName}>
      <div className='container'>
        <ul className='breadcrumbs__list' data-testid='breadcrumbs-container'>
          {sortedCrumbs.map((current) => (
            <li className='breadcrumbs__item' key={current.position} data-testid='breadcrumbs-item'>
              {renderItem(current)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
