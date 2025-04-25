import { PaginationTestId } from '@features/pagination/config/const';
import { Classed } from '@shared/model/style-types';
import classNames from 'classnames';
import { JSX, MouseEventHandler } from 'react';

type PaginationPanelItemProps = Classed<{
  isActive?: boolean;
  pageNumber: number;
  description: string;
  onClick: (pageNumber: number) => void;
}>;

export function PaginationPanelItem({pageNumber, className, onClick, description, isActive = false}: PaginationPanelItemProps): JSX.Element {
  const itemClassName = classNames('pagination__item', className);
  const linkClassName = classNames('pagination__link', {
    'pagination__link--active': isActive
  });

  const pageLinkClickHandler: MouseEventHandler<HTMLAnchorElement> = (event) => {
    event.preventDefault();
    onClick(pageNumber);
  };

  return (
    <li className={itemClassName} data-testid={PaginationTestId.PanelItem}>
      <a
        className={linkClassName}
        href={String(pageNumber)}
        onClick={!isActive ? pageLinkClickHandler : undefined}
      >
        {description}
      </a>
    </li>
  );
}
