import { BasketProductCard } from '@entities/product';
import { ProductInBasket } from '@features/basket/model/types';
import { moneyFormat } from '@shared/lib/format';
import { Classed } from '@shared/model/style-types';
import { JSX, MouseEventHandler } from 'react';
import { BasketItemQuantity } from '../basket-item-quantity';
import { useBasket } from '@features/basket/lib/use-basket';
import { ElementSize } from '@shared/model/html';
import { SvgIcon } from '@shared/ui/svg-icon';
import { BasketItemTestId } from '@features/basket/config/const';
import { getCorrectItemsCountByRange } from '@features/basket/lib/tools';

type BasketItemProps = Classed<{
  item: ProductInBasket;
  onDeleteItem: (itemId: number) => void;
}>

const DELETE_ITEM_ICON_SIZE: ElementSize = {
  height: 10,
  width: 10
};

export function BasketItem({ item, className, onDeleteItem }: BasketItemProps): JSX.Element {
  const { updateItem } = useBasket();

  const updateItemCounterHandler = (itemId: number, count: number): void => {
    updateItem({
      productId: itemId,
      count: getCorrectItemsCountByRange(count)
    });
  };

  const deleteItemClickHandler: MouseEventHandler<HTMLButtonElement> = () => onDeleteItem(item.product.id);

  return (
    <BasketProductCard
      product={item.product}
      className={className}
      as='li'
      data-testid='basket-item'
    >
      <p className='basket-item__price' data-testid={BasketItemTestId.OneProductPrice}>
        <span className='visually-hidden'>Цена:</span>
        {moneyFormat(item.product.price)}
      </p>
      <BasketItemQuantity
        count={item.count}
        itemId={item.product.id}
        onUpdateItemCounter={updateItemCounterHandler}
      />
      <div className='basket-item__total-price' data-testid={BasketItemTestId.AllProductPrice}>
        <span className='visually-hidden'>Общая цена:</span>
        {moneyFormat(item.product.price * item.count)}
      </div>
      <button
        className='cross-btn'
        type='button'
        aria-label='Удалить товар'
        data-testid={BasketItemTestId.DeleteButton}
        onClick={deleteItemClickHandler}
      >
        <SvgIcon
          size={DELETE_ITEM_ICON_SIZE}
          xlinkHref='#icon-close'
        />
      </button>
    </BasketProductCard>
  );
}
