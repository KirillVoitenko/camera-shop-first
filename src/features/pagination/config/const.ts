import { PagePaginationParams } from '../model/types';

const INITIAL_PAGE = 1;
export const MAX_ITEMS_IN_ONE_PAGE = 9;
export const MAX_PAGE_LINKS = 3;

export enum PaginationTestId {
  Pagination = 'pagination-container',
  Panel = 'pagination-panel',
  PanelItem = 'pagination-panel-item'
}

export const INITIAL_PAGE_PARAMS: PagePaginationParams = {
  page: INITIAL_PAGE
};
