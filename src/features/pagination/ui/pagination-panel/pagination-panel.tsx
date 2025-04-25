import { INITIAL_PAGE, PaginationTestId } from '@features/pagination/config/const';
import { Classed } from '@shared/model/style-types';
import classNames from 'classnames';
import { JSX } from 'react';
import { PaginationPanelItem } from '../pagination-panel-item';

type PaginationPanelProps = Classed<{
  activePage: number;
  maxRenderedLinks: number;
  pagesCount: number;
  onLinkClick: (newPage: number) => void;
}>

export function PaginationPanel({
  className,
  activePage,
  maxRenderedLinks,
  pagesCount,
  onLinkClick
}: PaginationPanelProps): JSX.Element {
  const listClassName = classNames('pagination__list', className);
  const allPages = Array.from({length: pagesCount}).map((_, index) => index + 1);
  const firstDisplayedPageNumber = pagesCount - activePage >= maxRenderedLinks - 1
    ? Math.max(activePage - 1, INITIAL_PAGE)
    : pagesCount - maxRenderedLinks + 1;
  const firstDisplayedPageIndex = Math.max(0, allPages.findIndex((current) => current === firstDisplayedPageNumber));
  const displayedPages = allPages.slice(firstDisplayedPageIndex, firstDisplayedPageIndex + maxRenderedLinks);

  return (
    <ul className={listClassName} data-testid={PaginationTestId.Panel}>
      {(activePage > INITIAL_PAGE && pagesCount >= maxRenderedLinks) && (
        <PaginationPanelItem
          description='Назад'
          onClick={onLinkClick}
          pageNumber={activePage - 1}
        />
      )}
      {displayedPages.map((current) => (
        <PaginationPanelItem
          description={String(current)}
          isActive={current === activePage}
          onClick={onLinkClick}
          pageNumber={current}
          key={`page-link-${current}`}
        />
      ))}
      {(activePage < pagesCount && pagesCount >= maxRenderedLinks) && (
        <PaginationPanelItem
          description='Далее'
          onClick={onLinkClick}
          pageNumber={activePage + 1}
        />
      )}
    </ul>
  );
}
