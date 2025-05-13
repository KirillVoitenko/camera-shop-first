import { withStore } from '@test-utills/wrappers';
import { generateProductMock } from '@test-utills/mocks/product';
import { createMemoryHistory } from 'history';
import { Catalog } from '../catalog';
import { render } from '@testing-library/react';
import faker from 'faker';
import { Product } from '@entities/product';
import { JSX } from 'react';

type CatalogChildrenComponent<TItemType> = (products: TItemType[]) => JSX.Element;
type FakeFilterProps = {
  products: Product[];
  children: CatalogChildrenComponent<Product>;
};

type FakeSortingProps = FakeFilterProps;

type FakePaginationProps<TItemType> = {
  items: TItemType[];
  children: CatalogChildrenComponent<TItemType>;
}

const FAKE_FILTER_TEXT = 'FAKE FILTER';
const FAKE_SORTING_TEXT = 'FAKE SORTING';
const FAKE_PAGINATION_TEXT = 'FAKE PAGINATION';
const FAKE_PRODUCTS_LIST_TEXT = 'FAKE PRODUCTS LIST';

const FakeFilter = ({products, children}: FakeFilterProps): JSX.Element => (
  <div>
    <p>{FAKE_FILTER_TEXT}</p>
    {children(products)}
  </div>
);

const FakeSorting = ({ children, products }: FakeSortingProps): JSX.Element => (
  <div>
    <p>{FAKE_SORTING_TEXT}</p>
    {children(products)}
  </div>
);

const FakePagination = <TItemType,>({ children, items }: FakePaginationProps<TItemType>): JSX.Element => (
  <div>
    <p>{FAKE_PAGINATION_TEXT}</p>
    {children(items)}
  </div>
);

const FAKE_RENDER_PRODUCTS_LIST = (products: Product[]) => (
  <p>
    <span>{FAKE_PRODUCTS_LIST_TEXT}</span>
    <span>{products.length}</span>
  </p>
);

const INIT_ROUTE = '/init-route';
const EMPTY_SECTION_PATTERN = /к сожалению все раскупили/gmi;

const PRODUCTS_COUNT = faker.datatype.number({min: 1});

const generateProductsArray = () => Array.from({length: PRODUCTS_COUNT}).map(generateProductMock);

describe('component \'Catalog\'', () => {
  const history = createMemoryHistory();

  beforeEach(() => {
    history.replace(INIT_ROUTE);
  });

  it('should correct render with empty products', () => {
    const { wrappedComponent } = withStore(
      <Catalog renderProductsList={FAKE_RENDER_PRODUCTS_LIST}/>,
      {
        products: {
          loading: false,
          products: [],
          promos: []
        }
      }
    );

    const screen = render(wrappedComponent);

    expect(screen.getByText(EMPTY_SECTION_PATTERN)).toBeInTheDocument();
  });

  it('should correct render with existing products', async () => {
    vi.spyOn(await import('@features/products-filter'), 'ProductsFilter').mockImplementation(FakeFilter);
    vi.spyOn(await import('@features/products-sorting'), 'ProductsSorting').mockImplementation(FakeSorting);
    vi.spyOn(await import('@features/pagination'), 'Pagination').mockImplementation(FakePagination);
    const { wrappedComponent } = withStore(
      <Catalog renderProductsList={FAKE_RENDER_PRODUCTS_LIST} />,
      {
        products: {
          loading: false,
          products: generateProductsArray(),
          promos: []
        }
      }
    );

    const screen = render(wrappedComponent);

    expect(screen.queryByText(EMPTY_SECTION_PATTERN)).toBeNull();
    expect(screen.getByText(FAKE_FILTER_TEXT)).toBeInTheDocument();
    expect(screen.getByText(FAKE_SORTING_TEXT)).toBeInTheDocument();
    expect(screen.getByText(FAKE_PAGINATION_TEXT)).toBeInTheDocument();
    expect(screen.getByText(FAKE_PRODUCTS_LIST_TEXT)).toBeInTheDocument();
  });
});
