import { render } from '@testing-library/react';
import { ProductTabs } from '../product-tabs';
import { generateProductMock } from '@test-utills/mocks/product';
import userEvent from '@testing-library/user-event';

describe('Component \'ProductTabs\'', () => {
  const productMock = generateProductMock();
  it.each([
    { activeTabText: 'Характеристики', tabContentTestId: 'product-characteristics-list' },
    { activeTabText: 'Описание', tabContentTestId: 'product-description' }
  ])('should correct render by tab $activeTabText is active', async ({ activeTabText, tabContentTestId }) => {
    const screen = render(<ProductTabs product={productMock} />);

    await userEvent.click(
      screen.getByText(activeTabText, {selector: 'button'})
    );
    const contentElement = screen.getByTestId(tabContentTestId);

    expect(contentElement.closest('.tabs__element.is-active')).toBeTruthy();
  });
});
