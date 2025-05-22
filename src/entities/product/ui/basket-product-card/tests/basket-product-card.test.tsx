import { render } from '@testing-library/react';
import { withRouter } from '@test-utills/wrappers';
import { BasketProductCard } from '../basket-product-card';
import { PRODUCT_CHARACTERISTICS_LIST_TEST_ID } from '@entities/product/config/const';
import { generateProductMock } from '@test-utills/mocks/product';
import faker from 'faker';

const PREVIEW_TEST_ID = 'preview-container';
const PRODUCT_MOCK = generateProductMock();
const FAKE_CHILD_TEXT = faker.lorem.sentence();

describe('Component \'BasketProductCard\'', () => {
  it('should correct render without description extra info', () => {
    const screen = render(
      withRouter(
        <BasketProductCard product={PRODUCT_MOCK}>
          <p>{FAKE_CHILD_TEXT}</p>
        </BasketProductCard>
      )
    );

    expect(screen.getByTestId(PRODUCT_CHARACTERISTICS_LIST_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(PREVIEW_TEST_ID)).toBeInTheDocument();
    expect(screen.getByText(FAKE_CHILD_TEXT)).toBeInTheDocument();
  });

  it('should correct render with description extra info', () => {
    const fakeExtraInfoText = faker.lorem.paragraph();
    const screen = render(
      withRouter(
        <BasketProductCard
          product={PRODUCT_MOCK}
          renderDescriptionExtraInfo={() => (
            <p>
              {fakeExtraInfoText}
            </p>
          )}
        >
          <p>{FAKE_CHILD_TEXT}</p>
        </BasketProductCard>
      )
    );

    expect(screen.getByTestId(PRODUCT_CHARACTERISTICS_LIST_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(PREVIEW_TEST_ID)).toBeInTheDocument();
    expect(screen.getByText(FAKE_CHILD_TEXT)).toBeInTheDocument();
    expect(screen.getByText(fakeExtraInfoText)).toBeInTheDocument();
  });
});
