import { ElementSize } from '@shared/model/html';

export const SEARCH_ICON_SIZE: ElementSize = {
  height: 16,
  width: 16
};

export const RESET_ICON_SIZE: ElementSize = {
  height: 10,
  width: 10
};

export const MIN_SYMBOLS_IN_SEARCH_QUERY = 3;
export const DEFAULT_SEARCH_QUERY = '';

export enum SearchTestId {
  List = 'search-result-list',
  ListItem = 'search-result-item'
}
