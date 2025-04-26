import { render } from '@testing-library/react';
import { ProductTabs } from '../product-tabs';
import { generateProductMock } from '@test-utills/mocks/product';
import userEvent from '@testing-library/user-event';
import { withRouter } from '@test-utills/wrappers';

describe('Component \'ProductTabs\'', () => {
  const productMock = generateProductMock();
  it.each([
    { activeTabText: 'Характеристики', tabContentTestId: 'product-characteristics-list' },
    { activeTabText: 'Описание', tabContentTestId: 'product-description' }
  ])('should correct render by tab $activeTabText is active', async ({ activeTabText, tabContentTestId }) => {
    const screen = render(withRouter(<ProductTabs product={productMock} />));

    await userEvent.click(
      screen.getByText(activeTabText, {selector: 'button'})
    );
    const contentElement = screen.getByTestId(tabContentTestId);

    expect(contentElement.closest('.tabs__element.is-active')).toBeTruthy();
  });
});
