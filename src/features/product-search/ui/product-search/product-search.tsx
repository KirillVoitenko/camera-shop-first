import { productsDataSelector } from '@entities/product';
import {
  MIN_SYMBOLS_IN_SEARCH_QUERY,
  RESET_ICON_SIZE,
  SEARCH_ICON_SIZE,
  DEFAULT_SEARCH_QUERY
} from '@features/product-search/config/const';
import { useAppSelector } from '@shared/lib/store';
import { AppRoutesEnum } from '@shared/model/enums';
import { SvgIcon } from '@shared/ui/svg-icon';
import classNames from 'classnames';
import { ChangeEventHandler, JSX, KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { SearchResult } from '../search-result';

enum NavigationKeys {
  Enter = 'Enter',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  Tab = 'Tab'
}

const DEFAULT_ACTIVE_ITEM_INDEX = -1;
const SYSTEM_KEYNAMES = [ NavigationKeys.Enter, NavigationKeys.ArrowUp, NavigationKeys.ArrowDown, NavigationKeys.Tab];

export function ProductSearch(): JSX.Element {
  const searchResultListRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();
  const products = useAppSelector(productsDataSelector);
  const [searchQuery, setSearchQuery] = useState<string>(DEFAULT_SEARCH_QUERY);
  const [activeItemIndex, setActiveItemIndex] = useState<number>(DEFAULT_ACTIVE_ITEM_INDEX);

  const searchQueryInputChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => setSearchQuery(event.target.value);

  const isNeedShowSearchResult = searchQuery.length >= MIN_SYMBOLS_IN_SEARCH_QUERY;
  const containerClassName = classNames(
    'form-search',
    {
      'list-opened': searchQuery.length > 0
    }
  );

  const searchedProducts = isNeedShowSearchResult
    ? products.filter((current) => current.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const searchReset = () => {
    setSearchQuery(DEFAULT_SEARCH_QUERY);
    setActiveItemIndex(DEFAULT_ACTIVE_ITEM_INDEX);
  };

  const searchQueryInputKeydownHandler: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (SYSTEM_KEYNAMES.includes(event.key as NavigationKeys)) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (searchedProducts.length > activeItemIndex) {
      switch (event.key) {
        case NavigationKeys.ArrowUp: {
          setActiveItemIndex((prev) => prev > 0 ? prev - 1 : searchedProducts.length - 1);
          break;
        }
        case NavigationKeys.Tab:
        case NavigationKeys.ArrowDown: {
          setActiveItemIndex((prev) => prev < searchedProducts.length - 1 ? prev + 1 : 0);
          break;
        }
        case NavigationKeys.Enter: {
          if (activeItemIndex < searchedProducts.length && activeItemIndex > DEFAULT_ACTIVE_ITEM_INDEX) {
            const productPageUrl = generatePath(AppRoutesEnum.Product, { productId: String(searchedProducts[activeItemIndex].id) });
            searchReset();
            navigate(productPageUrl);
          }
          break;
        }
        default: {
          setActiveItemIndex(DEFAULT_ACTIVE_ITEM_INDEX);
        }
      }
    }
  };

  useEffect(
    () => {
      if (searchResultListRef.current && activeItemIndex !== DEFAULT_ACTIVE_ITEM_INDEX) {
        const listPadding = 8;
        const listRect = searchResultListRef.current.getBoundingClientRect();
        const listElements = searchResultListRef.current.querySelectorAll('li');
        const activeElementRect = listElements[activeItemIndex].getBoundingClientRect();

        if (listRect.top > activeElementRect.top || listRect.bottom < activeElementRect.bottom) {
          let scrollDistance = 0;

          if (listRect.top >= activeElementRect.top) {
            const topValue = listRect.top - activeElementRect.top + listPadding;
            scrollDistance = topValue < 0 ? topValue : -topValue;
          } else if (listRect.bottom <= activeElementRect.bottom) {
            scrollDistance = activeElementRect.bottom - listRect.bottom + listPadding;
          }
          searchResultListRef.current.scrollBy({ top: scrollDistance, left: 0, behavior: 'smooth' });
        }
      }
    },
    [activeItemIndex, searchedProducts.length]
  );

  return (
    <div className={containerClassName}>
      <form>
        <label>
          <SvgIcon
            size={SEARCH_ICON_SIZE}
            xlinkHref='#icon-lens'
            className='form-search__icon'
          />
          <input
            className='form-search__input'
            type='text'
            autoComplete='off'
            placeholder='Поиск по сайту'
            value={searchQuery}
            onChange={searchQueryInputChangeHandler}
            onKeyDown={searchQueryInputKeydownHandler}
          />
        </label>
        <SearchResult
          ref={searchResultListRef}
          activeItemIndex={activeItemIndex}
          items={searchedProducts}
          onSearchReset={searchReset}
        />
      </form>
      <button
        className='form-search__reset'
        type='reset'
        onClick={searchReset}
      >
        <SvgIcon
          size={RESET_ICON_SIZE}
          xlinkHref='#icon-close'
        />
        <span className='visually-hidden'>Сбросить поиск</span>
      </button>
    </div>
  );
}
