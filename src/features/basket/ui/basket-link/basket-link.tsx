import { JSX } from 'react';
import { SvgIcon } from '@shared/ui/svg-icon';
import { Link, To } from 'react-router-dom';
import { AppRoutesEnum } from '@shared/model/enums';
import { Classed } from '@shared/model/style-types';
import { ElementSize } from '@shared/model/html';
import { BASKET_ICON_SIZE } from '@features/basket/config/const';
import { useAppSelector } from '@shared/lib/store';
import { basketDataSelector } from '@features/basket/model/basket-slice';
import { BasketLinkTestId } from '@features/basket/config/const';

type BasketLinkProps = Classed<{
  iconId?: string;
  link?: To;
  size?: ElementSize;
}>;

export function BasketLink({
  className,
  iconId = '#icon-basket',
  link = AppRoutesEnum.Basket,
  size = BASKET_ICON_SIZE
}: BasketLinkProps): JSX.Element {
  const basket = useAppSelector(basketDataSelector);
  const productsCount = basket.reduce((accum, current) => accum + current.count, 0);

  return (
    <Link to={link} className={className} data-testid={BasketLinkTestId.Link}>
      <SvgIcon
        testId={BasketLinkTestId.Icon}
        size={size}
        xlinkHref={iconId}
        isAriaHidden
      />
      {productsCount > 0 && <span className='header__basket-count'>{productsCount}</span>}
    </Link>
  );
}
