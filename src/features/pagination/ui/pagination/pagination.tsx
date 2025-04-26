import {
  MAX_ITEMS_IN_ONE_PAGE,
  MAX_PAGE_LINKS,
  INITIAL_PAGE_PARAMS,
  PaginationTestId
} from '@features/pagination/config/const';
import { Classed } from '@shared/model/style-types';
import { JSX, useCallback, useEffect } from 'react';
import { PaginationPanel } from '../pagination-panel';
import { getItemsByPage } from '@features/pagination/lib/get-items-by-page';
import { usePageSearchParams } from '@shared/lib/use-page-search-params';
import {
  convertPaginationParamsToSearchParams,
  convertSearchParamsToPaginationParams
} from '@features/pagination/lib/convert-page-pagination-params';

type PaginationProps<TItemType> = Classed<{
  items: TItemType[];
  itemsOnPageCount?: number;
  maxRenderedPageLinksCount?: number;
  children: (itemsByPage: TItemType[]) => JSX.Element;
}>

const getCorrectPageNumber = (initialNumber: number, activeNumber: number, maxNumber: number): number => {
  const maxPageNumber = Math.min(maxNumber, activeNumber);
  return Math.max(initialNumber, maxPageNumber);
};

export function Pagination<TItemType>({
  children,
  items,
  className,
  itemsOnPageCount = MAX_ITEMS_IN_ONE_PAGE,
  maxRenderedPageLinksCount = MAX_PAGE_LINKS,
}: PaginationProps<TItemType>): JSX.Element {
  const { changePageSearchParams, getConcretePageSearchParam } = usePageSearchParams(
    INITIAL_PAGE_PARAMS,
    convertPaginationParamsToSearchParams,
    convertSearchParamsToPaginationParams
  );

  const pagesCount = Math.ceil(items.length / itemsOnPageCount);

  const changePage = useCallback(
    (newPage: number) => {
      const correctPageNumber = getCorrectPageNumber(INITIAL_PAGE_PARAMS.page, newPage, pagesCount);
      if (correctPageNumber !== getConcretePageSearchParam('page')) {
        changePageSearchParams({page: newPage});
      }
    },
    [changePageSearchParams, getConcretePageSearchParam, pagesCount]
  );

  useEffect(
    () => {
      let componentIsRendered = false;

      if (!componentIsRendered && pagesCount !== 0) {
        const sourcePage = getConcretePageSearchParam('page');
        const activePage = getCorrectPageNumber(
          INITIAL_PAGE_PARAMS.page,
          sourcePage,
          pagesCount
        );

        if (sourcePage !== activePage) {
          changePage(activePage);
        }
      }

      return () => {
        componentIsRendered = true;
      };
    },
    [changePage, getConcretePageSearchParam, pagesCount]
  );

  return (
    <>
      {children(getItemsByPage(items, getConcretePageSearchParam('page'), itemsOnPageCount))}
      {items.length > itemsOnPageCount && (
        <div className='pagination' data-testid={PaginationTestId.Pagination}>
          <PaginationPanel
            className={className}
            activePage={getConcretePageSearchParam('page')}
            maxRenderedLinks={maxRenderedPageLinksCount}
            pagesCount={pagesCount}
            onLinkClick={changePage}
          />
        </div>
      )}
    </>
  );
}
