import { getFilteredProductsInfo } from '../filter-products';
import { INITIAL_FILTER } from '@features/products-filter/config/const';
import { generateProductMock } from '@test-utills/mocks/product';
import faker from 'faker';
import { adaptFormValueToFilterValue } from '../../form-value-adapter';
import { FilteredProductsInfo, FilterValue } from '@features/products-filter/model/types';
import { getPriceLimitsByProducts, Product, ProductCategory, ProductType, RecommendedUserLevel } from '@entities/product';

type ProductCharacteristics = Partial<Pick<Product, 'category' | 'level' | 'type'>>

const generateProductsArrayWithConcreteCharacteristics = (length: number, characteristics: ProductCharacteristics): Product[] => Array.from({ length }).map(() => {
  const item = generateProductMock();
  return {
    ...item,
    ...characteristics
  };
});

describe('function \'getFilteredProductsInfo\'', () => {
  it('should return correct info by empty products', () => {
    const filterValue = adaptFormValueToFilterValue(INITIAL_FILTER);
    const expectedResult: FilteredProductsInfo = {
      filteredProducts: [],
      priceLimit: {
        max: null,
        min: null
      }
    };

    const result = getFilteredProductsInfo([], filterValue);

    expect(result).toEqual(expectedResult);
  });

  it('should return correct info by empty filter', () => {
    const productsCount = faker.datatype.number({min: 1, max: 20});
    const filterValue = adaptFormValueToFilterValue(INITIAL_FILTER);
    const products = Array.from({length: productsCount}).map(generateProductMock);
    const priceLimit = getPriceLimitsByProducts(products);
    const expectedResult: FilteredProductsInfo = {
      filteredProducts: products,
      priceLimit
    };

    const result = getFilteredProductsInfo(products, filterValue);

    expect(result).toEqual(expectedResult);
  });

  it('should return correct info by category selected', () => {
    const photoCameras = generateProductsArrayWithConcreteCharacteristics(3, {category: ProductCategory.PhotoCamera});
    const videoCamera = generateProductsArrayWithConcreteCharacteristics(3, {category: ProductCategory.VideoCamera});
    const products = [...photoCameras, ...videoCamera];
    const priceLimit = getPriceLimitsByProducts(photoCameras);
    const filterValue: FilterValue = adaptFormValueToFilterValue(
      {
        ...INITIAL_FILTER,
        category: ProductCategory.PhotoCamera
      }
    );
    const expectedResult: FilteredProductsInfo = {
      priceLimit,
      filteredProducts: photoCameras
    };

    const result = getFilteredProductsInfo(products, filterValue);

    expect(result).toEqual(expectedResult);
  });

  it('should return correct info by type selected', () => {
    const collectionCameras = generateProductsArrayWithConcreteCharacteristics(3, {type: ProductType.Collection});
    const momentalCameras = generateProductsArrayWithConcreteCharacteristics(3, {type: ProductType.Momental});
    const products = [...collectionCameras, ...momentalCameras];
    const priceLimit = getPriceLimitsByProducts(collectionCameras);
    const filterValue: FilterValue = adaptFormValueToFilterValue(
      {
        ...INITIAL_FILTER,
        hasCollectionType: true
      }
    );
    const expectedResult: FilteredProductsInfo = {
      priceLimit,
      filteredProducts: collectionCameras
    };

    const result = getFilteredProductsInfo(products, filterValue);

    expect(result).toEqual(expectedResult);
  });

  it('should return correct info by level selected', () => {
    const amateurCameras = generateProductsArrayWithConcreteCharacteristics(3, {level: RecommendedUserLevel.Amateur});
    const professionalCameras = generateProductsArrayWithConcreteCharacteristics(3, {level: RecommendedUserLevel.Professional});
    const products = [...amateurCameras, ...professionalCameras];
    const priceLimit = getPriceLimitsByProducts(amateurCameras);
    const filterValue: FilterValue = adaptFormValueToFilterValue(
      {
        ...INITIAL_FILTER,
        hasAmateurLevel: true
      }
    );
    const expectedResult: FilteredProductsInfo = {
      priceLimit,
      filteredProducts: amateurCameras
    };

    const result = getFilteredProductsInfo(products, filterValue);

    expect(result).toEqual(expectedResult);
  });
});
