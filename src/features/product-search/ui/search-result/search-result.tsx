import { Product } from '@entities/product';
import { AppRoutesEnum } from '@shared/model/enums';
import { Classed } from '@shared/model/style-types';
import classNames from 'classnames';
import { ForwardedRef, forwardRef, JSX } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { SearchTestId } from '@features/product-search/config/const';

type SearchResultProps = Classed<{
  items: Product[];
  onSearchReset: () => void;
  activeItemIndex: number;
}>;

export const SearchResult = forwardRef(({ items, onSearchReset, className, activeItemIndex }: SearchResultProps, ref: ForwardedRef<HTMLUListElement>): JSX.Element => {
  const listClassName = classNames('form-search__select-list', className);

  return (
    <ul ref={ref} className={listClassName} data-testid={SearchTestId.List}>
      {items.length > 0
        ? items.map((current, index) => (
          <li
            key={current.id}
            className={classNames('form-search__select-item', {'is-active': activeItemIndex === index})}
            data-testid={SearchTestId.ListItem}
          >
            <Link
              to={generatePath(AppRoutesEnum.Product, { productId: String(current.id) })}
              onClick={onSearchReset}
            >
              {current.name}
            </Link>
          </li>
        ))
        : (
          <li className='form-search__select-item'>
            Нет результатов
          </li>
        )}
    </ul>
  );
});

SearchResult.displayName = 'SearchResult';
