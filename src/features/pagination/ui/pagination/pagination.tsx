import {
  MAX_ITEMS_IN_ONE_PAGE,
  MAX_PAGE_LINKS,
  INITIAL_PAGE,
  PaginationTestId
} from '@features/pagination/config/const';
import { Classed } from '@shared/model/style-types';
import { JSX, useState } from 'react';
import { PaginationPanel } from '../pagination-panel';
import { getItemsByPage } from '@features/pagination/lib/get-items-by-page';

type PaginationProps<TItemType> = Classed<{
  items: TItemType[];
  itemsOnPageCount?: number;
  maxRenderedPageLinksCount?: number;
  children: (itemsByPage: TItemType[]) => JSX.Element;
}>

export function Pagination<TItemType>({
  children,
  items,
  className,
  itemsOnPageCount = MAX_ITEMS_IN_ONE_PAGE,
  maxRenderedPageLinksCount = MAX_PAGE_LINKS,
}: PaginationProps<TItemType>): JSX.Element {
  const [activePage, setActivePage] = useState(INITIAL_PAGE);
  const pagesCount = Math.ceil(items.length / itemsOnPageCount);

  return (
    <>
      {children(getItemsByPage(items, activePage, itemsOnPageCount))}
      {items.length > itemsOnPageCount && (
        <div className='pagination' data-testid={PaginationTestId.Pagination}>
          <PaginationPanel
            className={className}
            activePage={activePage}
            maxRenderedLinks={maxRenderedPageLinksCount}
            pagesCount={pagesCount}
            onLinkClick={setActivePage}
          />
        </div>
      )}
    </>
  );
}
