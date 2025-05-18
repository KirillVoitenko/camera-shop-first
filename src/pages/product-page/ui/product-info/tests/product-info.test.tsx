import { ProductInfo } from '../product-info';
import { render } from '@testing-library/react';
import { generateProductMock } from '@test-utills/mocks/product';

const FAKE_PRODUCT_CARD_TEXT = 'FAKE PRODUCT CARD';
const FAKE_SIMILARS_TEXT = 'FAKE SIMILAR PRODUCTS';
const PRODUCT_MOCK = generateProductMock();

describe('Component \'ProductInfo\'' , () => {
  const addToBasketMock = vi.fn();

  it('should correct render', async () => {
    vi.spyOn(await import('@entities/product'), 'FullProductCard').mockImplementation(vi.fn(() => <p>{FAKE_PRODUCT_CARD_TEXT}</p>));
    vi.spyOn(await import('../../similar-products'), 'SimilarProducts').mockImplementation(vi.fn(() => <p>{FAKE_SIMILARS_TEXT}</p>));
    vi.spyOn(await import('@features/call-item-modal-content'), 'CallItemModalContent').mockImplementation(vi.fn(() => <p>FAKE CALL MODAL</p>));
    vi.spyOn(await import('@shared/lib/store/use-async-thunk-dispatch'), 'useAsyncThunkDispatch').mockImplementation(vi.fn());
    vi.spyOn(await import('@features/basket'), 'useBasket').mockImplementation(vi.fn(() => ({basket: [], addItem: addToBasketMock})));

    const screen = render(<ProductInfo product={PRODUCT_MOCK}/>);

    expect(screen.getByText(FAKE_PRODUCT_CARD_TEXT)).toBeInTheDocument();
    expect(screen.getByText(FAKE_SIMILARS_TEXT)).toBeInTheDocument();
  });
});
