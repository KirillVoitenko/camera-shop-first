import { Product } from '@entities/product';
import { ProductsFilter } from '../products-filter';
import { FilterFieldsetTestId, INITIAL_FILTER } from '@features/products-filter/config/const';
import { generateProductMock } from '@test-utills/mocks/product';
import { render } from '@testing-library/react';
import faker from 'faker';
import { FilterValue } from '@features/products-filter/model/types';
import userEvent from '@testing-library/user-event';

vi.mock('@shared/lib/debounce', () => ({
  debounce: (callback: (...args: unknown[]) => void) => callback
}));

const RESET_BUTTON_PATTERN = /сбросить фильтры/gmi;
const PRODUCTS_LENGTH = faker.datatype.number({ min: 1, max: 30 });
const FAKE_CARD_TEST_ID = 'fake-product-card';

const generateProductsArray = (productsCount = PRODUCTS_LENGTH) => Array.from({ length: productsCount }).map(generateProductMock);

const renderProductsFilter = (products: Product[]) => render(
  <ProductsFilter products={products}>
    {(filteredProducts) => (
      <div>
        {filteredProducts.map((current) => (
          <div key={current.id} data-testid={FAKE_CARD_TEST_ID}>
            <p>
              {current.name}
            </p>
            <p>
              {current.price}
            </p>
          </div>
        ))}
      </div>
    )}
  </ProductsFilter>
);

describe('component \'ProductsFilter\'', () => {
  it('should correct render', () => {
    const products = generateProductsArray();

    const screen = renderProductsFilter(products);

    expect(screen.getByTestId(FilterFieldsetTestId.Category)).toBeInTheDocument();
    expect(screen.getByTestId(FilterFieldsetTestId.Level)).toBeInTheDocument();
    expect(screen.getByTestId(FilterFieldsetTestId.Price)).toBeInTheDocument();
    expect(screen.getByTestId(FilterFieldsetTestId.Type)).toBeInTheDocument();
    expect(screen.getByText(RESET_BUTTON_PATTERN)).toBeInTheDocument();
    expect(screen.getAllByTestId(FAKE_CARD_TEST_ID).length).toBe(products.length);
  });

  it('should call children with filtered items', async () => {
    const filterFunctionSpy = vi.spyOn(await import('@features/products-filter/lib/filter-products/filter-products'), 'getFilteredProductsInfo');
    const products = generateProductsArray();
    const minPrice = Math.min(...products.map((current) => current.price));
    const filteredProducts = products.filter((current) => current.price === minPrice);
    const screen = renderProductsFilter(products);

    const filterValue: FilterValue = {
      ...INITIAL_FILTER,
      priceBegin: minPrice,
      priceEnd: minPrice,
      category: null
    };

    await userEvent.type(
      screen.getByPlaceholderText('от'),
      minPrice.toString(10)
    );
    await userEvent.type(
      screen.getByPlaceholderText('до'),
      minPrice.toString(10)
    );

    expect(filterFunctionSpy).toBeCalledWith(products, filterValue);
    expect(screen.getAllByTestId(FAKE_CARD_TEST_ID).length).toBe(filteredProducts.length);
  });
});
