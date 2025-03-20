import { ProductCharacteristics } from '../product-characteristics';
import { render } from '@testing-library/react';
import { generateProductMock } from '@test-utills/mocks/product';
import { getProductTypeDisplayValue } from '@entities/product/lib/get-product-type-display-value';

const ARTICULUS_PATTERN = /артикул/gi;
const CATEGORY_PATTERN = /категория/gi;
const TYPE_PATTERN = /тип камеры/gi;
const LEVEL_PATTERN = /уровень/gi;

describe('Component \'ProductCharacteristics\'', () => {
  const productMock = generateProductMock();
  it('should correct render by \'page\' view type', () => {
    const screen = render(<ProductCharacteristics product={productMock} viewType='page' />);

    expect(screen.getByText(ARTICULUS_PATTERN)).toBeInTheDocument();
    expect(screen.getByText(productMock.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(CATEGORY_PATTERN)).toBeInTheDocument();
    expect(screen.getByText(productMock.category)).toBeInTheDocument();
    expect(screen.getByText(TYPE_PATTERN)).toBeInTheDocument();
    expect(screen.getByText(productMock.type)).toBeInTheDocument();
    expect(screen.getByText(LEVEL_PATTERN)).toBeInTheDocument();
    expect(screen.getByText(productMock.level)).toBeInTheDocument();
  });

  it('should correct render by \'buyModal\' view type', () => {
    const typeDescription = `${getProductTypeDisplayValue(productMock.type, productMock.category)} ${productMock.category}`;
    const levelDescription = `${productMock.level} уровень`;
    const screen = render(<ProductCharacteristics product={productMock} viewType='buyModal' />);

    expect(screen.getByText(ARTICULUS_PATTERN)).toBeInTheDocument();
    expect(screen.getByText(productMock.vendorCode)).toBeInTheDocument();
    expect(screen.getByText(typeDescription)).toBeInTheDocument();
    expect(screen.getByText(levelDescription)).toBeInTheDocument();
  });
});
