import { Product } from '@entities/product';
import { ProductsFilter } from '../products-filter';
import { FilterFieldsetTestId, INITIAL_FILTER } from '@features/products-filter/config/const';
import { generateProductMock } from '@test-utills/mocks/product';
import { render } from '@testing-library/react';
import faker from 'faker';
import { FilterFormValue, FilterValue } from '@features/products-filter/model/types';
import userEvent from '@testing-library/user-event';

vi.mock('@shared/lib/debounce', () => ({
  debounce: (callback: (...args: unknown[]) => void) => callback
}));

const RESET_BUTTON_PATTERN = /сбросить фильтры/gmi;
const PRODUCTS_LENGTH = 30;
const FAKE_CARD_TEST_ID = 'fake-product-card';

const generateProductsArray = (productsCount = PRODUCTS_LENGTH) => Array.from({ length: productsCount }).map(() => {
  const product = generateProductMock();
  product.price = faker.datatype.number({min: 1, max: 1000});
  return product;
});

const getInputByName = (container: HTMLElement, inputName: keyof FilterFormValue): HTMLInputElement | undefined =>
  Array.from(container.querySelectorAll('input')).find((current) => current.name === inputName);

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
    const products = generateProductsArray().map((current, index) => {
      current.price += index;
      return current;
    });
    const minPrice = Math.min(...products.map((current) => current.price));
    const screen = renderProductsFilter(products);

    const filterValue: FilterValue = {
      ...INITIAL_FILTER,
      priceBegin: minPrice,
      priceEnd: minPrice,
      category: null
    };

    const priceBeginInput = getInputByName(screen.container, 'priceBegin');
    const priceEndInput = getInputByName(screen.container, 'priceEnd');

    if (priceBeginInput && priceEndInput) {
      await userEvent.type(
        priceBeginInput,
        minPrice.toString(10)
      );
      await userEvent.type(
        priceEndInput,
        minPrice.toString(10)
      );
      expect(filterFunctionSpy).toBeCalledWith(products, filterValue);
      return;
    }

    throw new Error('price inputs not find');

  });
});
