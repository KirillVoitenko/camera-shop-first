import { render } from '@testing-library/react';
import { generateProductMock } from '@test-utills/mocks/product';
import { FullProductCard } from '../full-product-card';
import { FULL_PRODUCT_CARD_TEST_ID } from '@entities/product/config/const';
import { withRouter } from '@test-utills/wrappers';
import { moneyFormat } from '@shared/lib/format';

const PREVIEW_COMPONENT_TEST_ID = 'preview-container';
const TABS_COMPONENT_TEST_ID = 'product-tabs-container';

describe('Component \'FullProductCard\'', () => {
  const productMock = generateProductMock();

  it('should correct render', () => {
    const screen = render(withRouter(<FullProductCard product={productMock}/>));

    expect(screen.getByTestId(FULL_PRODUCT_CARD_TEST_ID)).toBeInTheDocument();
    expect(screen.getByText(productMock.name)).toBeInTheDocument();
    expect(screen.getByText(moneyFormat(productMock.price), {trim: false, collapseWhitespace: false})).toBeInTheDocument();
    expect(screen.getByTestId(PREVIEW_COMPONENT_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(TABS_COMPONENT_TEST_ID)).toBeInTheDocument();
  });
});
