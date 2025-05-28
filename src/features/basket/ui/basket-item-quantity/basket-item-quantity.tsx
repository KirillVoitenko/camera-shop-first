import { ElementSize } from '@shared/model/html';
import { SvgIcon } from '@shared/ui/svg-icon';
import {
  ChangeEventHandler,
  FocusEventHandler,
  JSX,
  MouseEventHandler,
  useState
} from 'react';
import { CounterRange, BasketItemQuantityTestId } from '@features/basket/config/const';
import { getCorrectItemsCountByRange } from '@features/basket/lib/tools';

type BasketItemQuantityProps = {
  itemId: number;
  count: number;
  onUpdateItemCounter: (itemId: number, count: number) => void;
}

const PREV_BUTTON_ICON_SIZE: ElementSize = {
  height: 12,
  width: 7
};

const NEXT_BUTTON_ICON_SIZE: ElementSize = {
  height: 10,
  width: 10,
};

export function BasketItemQuantity({
  count,
  itemId,
  onUpdateItemCounter
}: BasketItemQuantityProps): JSX.Element {
  const [countValue, setCountValue] = useState(count);

  const counterId = `basket-item-counter-${itemId}`;

  const updateCounter = (newValue: number): void => {
    const correctValue = getCorrectItemsCountByRange(newValue);
    setCountValue(correctValue);
    onUpdateItemCounter(itemId, correctValue);
  };

  const decreaseButtonClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    updateCounter(countValue - 1);
  };

  const increaseButtonClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    updateCounter(countValue + 1);
  };

  const counterInputChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = Number.parseInt(
      event.target.value ? event.target.value : '0',
      10
    );

    if (!Number.isNaN(value)) {
      setCountValue(getCorrectItemsCountByRange(value));
    }
  };

  const counterInputBlurHandler: FocusEventHandler<HTMLInputElement> = () => onUpdateItemCounter(itemId, countValue);

  return (
    <div className='quantity' data-testid={BasketItemQuantityTestId.Container}>
      <button
        className='btn-icon btn-icon--prev'
        onClick={decreaseButtonClickHandler}
        disabled={count <= CounterRange.Min}
        data-testid={BasketItemQuantityTestId.DecreaseCountButton}
      >
        <SvgIcon
          size={PREV_BUTTON_ICON_SIZE}
          xlinkHref='#icon-arrow'
        />
      </button>
      <label
        className='visually-hidden'
        htmlFor={counterId}
      />
      <input
        type='number'
        id={counterId}
        value={countValue}
        max={CounterRange.Max}
        min={CounterRange.Min}
        aria-label='количество товара'
        onChange={counterInputChangeHandler}
        onBlur={counterInputBlurHandler}
        data-testid={BasketItemQuantityTestId.CountInput}
      />
      <button
        className='btn-icon btn-icon--next'
        onClick={increaseButtonClickHandler}
        disabled={count >= CounterRange.Max}
        data-testid={BasketItemQuantityTestId.IncreaseCountButton}
      >
        <SvgIcon
          size={NEXT_BUTTON_ICON_SIZE}
          xlinkHref='#icon-arrow'
        />
      </button>
    </div>
  );
}
