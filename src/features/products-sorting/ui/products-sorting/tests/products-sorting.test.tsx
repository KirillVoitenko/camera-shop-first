import { ProductsSorting } from '../products-sorting';
import { render } from '@testing-library/react';
import { generateProductMock } from '@test-utills/mocks/product';
import faker from 'faker';
import { Product } from '@entities/product';
import { JSX } from 'react';
import { SortRadioTestId } from '@features/products-sorting/config/const';
import { ProductsSortingValue } from '@features/products-sorting/model/types';
import userEvent from '@testing-library/user-event';

const PRODUCTS_MOCK = Array.from({ length: faker.datatype.number({ min: 1, max: 20 }) }).map(generateProductMock);
const FAKE_PRODUCT_ITEM_TEST_ID = 'fake-product-item';

type FakeProductItemProps = {
  product: Product;
}

const FakeProductItem = ({ product }: FakeProductItemProps): JSX.Element => (
  <div data-testid={FAKE_PRODUCT_ITEM_TEST_ID}>
    <p>
      {product.name}
    </p>
    <p>
      {product.price}
    </p>
    <p>
      {product.rating}
    </p>
  </div>
);

const renderScreen = () => render(
  <ProductsSorting
    products={PRODUCTS_MOCK}
  >
    {(sortedProducts) => (
      <div>
        {sortedProducts.map((current) => <FakeProductItem product={current} key={current.id} />)}
      </div>
    )}
  </ProductsSorting>
);

type SortTestEachArg = {
  clickedRadioTestIds: [SortRadioTestId, SortRadioTestId];
  expectedSortingValue: ProductsSortingValue;
  caseName: string;
}

describe('Component \'ProductsSorting\'', () => {
  it('should correct render', () => {
    const screen = renderScreen();

    expect(screen.getByTestId(SortRadioTestId.Price)).toBeInTheDocument();
    expect(screen.getByTestId(SortRadioTestId.Rating)).toBeInTheDocument();
    expect(screen.getByTestId(SortRadioTestId.SortDown)).toBeInTheDocument();
    expect(screen.getByTestId(SortRadioTestId.SortUp)).toBeInTheDocument();
    expect(screen.getAllByTestId(FAKE_PRODUCT_ITEM_TEST_ID).length).toBe(PRODUCTS_MOCK.length);
  });

  it.each<SortTestEachArg>([
    {caseName: 'price up', clickedRadioTestIds: [SortRadioTestId.Price, SortRadioTestId.SortUp], expectedSortingValue: {type: 'PRICE', vector: 'UP'}},
    {caseName: 'price down', clickedRadioTestIds: [SortRadioTestId.Price, SortRadioTestId.SortDown], expectedSortingValue: {type: 'PRICE', vector: 'DOWN'}},
    {caseName: 'rating up', clickedRadioTestIds: [SortRadioTestId.Rating, SortRadioTestId.SortUp], expectedSortingValue: {type: 'POPULAR', vector: 'UP'}},
    {caseName: 'rating up', clickedRadioTestIds: [SortRadioTestId.Rating, SortRadioTestId.SortDown], expectedSortingValue: {type: 'POPULAR', vector: 'DOWN'}},
  ])('should sort by $caseName', async ({clickedRadioTestIds, expectedSortingValue}) => {
    const sortSpy = vi.spyOn(await import('@features/products-sorting/lib/sorting-functions'), 'sortProducts');
    const screen = renderScreen();

    for(let radioIndex = 0; radioIndex < clickedRadioTestIds.length; radioIndex++) {
      await userEvent.click(screen.getByTestId(clickedRadioTestIds[radioIndex]));
    }

    expect(sortSpy).lastCalledWith(PRODUCTS_MOCK, expectedSortingValue);
  });
});
