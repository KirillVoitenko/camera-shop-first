import { render } from '@testing-library/react';
import { BasketItemQuantity } from '../basket-item-quantity';
import { BasketItemQuantityTestId, CounterRange } from '@features/basket/config/const';
import { BasketItemShort } from '@features/basket/model/types';
import faker from 'faker';
import userEvent from '@testing-library/user-event';

type ChangeCounterButtonEachArg = {
  buttonTestId: BasketItemQuantityTestId;
  buttonType: 'increase' | 'decrease';
  expectedNewCounterValue: number;
}

const generateBasketItem = (): BasketItemShort => ({
  count: faker.datatype.number({ min: CounterRange.Min, max: CounterRange.Max }),
  productId: faker.datatype.number(),
});

describe('component \'BasketItemQuantity\'', () => {
  const onUpdateCounterMock = vi.fn();
  const fakeBasketItem = generateBasketItem();

  beforeEach(() => {
    onUpdateCounterMock.mockReset();
  });

  it('should correct render', () => {
    const screen = render(
      <BasketItemQuantity
        count={fakeBasketItem.count}
        itemId={fakeBasketItem.productId}
        onUpdateItemCounter={onUpdateCounterMock}
      />
    );

    expect(screen.getByTestId(BasketItemQuantityTestId.Container)).toBeInTheDocument();
    expect(screen.getByTestId(BasketItemQuantityTestId.DecreaseCountButton)).toBeInTheDocument();
    expect(screen.getByTestId(BasketItemQuantityTestId.IncreaseCountButton)).toBeInTheDocument();
    expect(screen.getByDisplayValue(fakeBasketItem.count)).toBeInTheDocument();
  });

  it.each<ChangeCounterButtonEachArg>([
    { buttonTestId: BasketItemQuantityTestId.IncreaseCountButton, buttonType: 'increase', expectedNewCounterValue: fakeBasketItem.count + 1 },
    { buttonTestId: BasketItemQuantityTestId.DecreaseCountButton, buttonType: 'decrease', expectedNewCounterValue: fakeBasketItem.count - 1 }
  ])('should call \'onUpdateItemCounter\' callback if $buttonType is clicked', async ({ buttonTestId, expectedNewCounterValue }) => {
    const screen = render(
      <BasketItemQuantity
        count={fakeBasketItem.count}
        itemId={fakeBasketItem.productId}
        onUpdateItemCounter={onUpdateCounterMock}
      />
    );

    const buttonElement = screen.getByTestId(buttonTestId);

    await userEvent.click(buttonElement);

    expect(onUpdateCounterMock).toBeCalledTimes(1);
    expect(onUpdateCounterMock).lastCalledWith(fakeBasketItem.productId, expectedNewCounterValue);
  });

  it('should call \'onUpdateItemCounter\' callback by input blur event', async () => {
    const newCounterValue = faker.datatype.number({ min: 1, max: 9 });
    const screen = render(
      <BasketItemQuantity
        count={fakeBasketItem.count}
        itemId={fakeBasketItem.productId}
        onUpdateItemCounter={onUpdateCounterMock}
      />
    );

    const expectedValue = Math.min(Number.parseInt(`${fakeBasketItem.count}${newCounterValue}`, 10), CounterRange.Max);

    const inputElement = screen.getByTestId(BasketItemQuantityTestId.CountInput);

    await userEvent.type(inputElement, `${newCounterValue}[Tab]`);

    expect(onUpdateCounterMock).lastCalledWith(fakeBasketItem.productId, expectedValue);
  });
});
