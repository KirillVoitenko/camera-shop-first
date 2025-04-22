import { PriceLimit, ProductCategory, ProductType, RecommendedUserLevel } from '@entities/product';
import {
  isExistsByCategoryFilter,
  isExistsProductByTypeFilter,
  isExistsByUserLevelFilter,
  ProductTypeFilterFields,
  ProductLevelFilterFields,
  isExistsProductByPriceFilter
} from '../filter-functions';
import { Nullable } from '@shared/model/utill-types';
import { generateProductMock } from '@test-utills/mocks/product';
import faker from 'faker';
import { DefaultPriceValues } from '@features/products-filter/config/const';

interface FilterFunctionBaseEachArg<TCharacteristicType, TFilterValueType> {
  expectedResult: boolean;
  productCharacteristic: TCharacteristicType;
  selectedValue: TFilterValueType;
}

type CategoryFilterEachArg = FilterFunctionBaseEachArg<ProductCategory, Nullable<ProductCategory>>;

type TypeFilterEachArg = FilterFunctionBaseEachArg<ProductType, ProductTypeFilterFields>;

type UserLevelFilterEachArg = FilterFunctionBaseEachArg<RecommendedUserLevel, ProductLevelFilterFields>;

type PriceLimiitFilterEachArg = Omit<FilterFunctionBaseEachArg<number, PriceLimit>, 'productCharacteristic'>;

type SelectedTypeFields = Partial<Record<keyof ProductTypeFilterFields, true>>;

type SelectedUserLevelFields = Partial<Record<keyof ProductLevelFilterFields, true>>;

const generateTypeFilterFields = (userFields?: SelectedTypeFields): ProductTypeFilterFields => {
  const initialValue: ProductTypeFilterFields = {
    hasCollectionType: false,
    hasDigitalType: false,
    hasFilmType: false,
    hasMomentalType: false
  };

  return {
    ...initialValue,
    ...userFields
  };
};

const generateUserLevelFilterFields = (userFields?: SelectedUserLevelFields): ProductLevelFilterFields => {
  const initialValue: ProductLevelFilterFields = {
    hasAmateurLevel: false,
    hasBeginnerLevel: false,
    hasProfessionalLevel: false,
  };

  return {
    ...initialValue,
    ...userFields
  };
};

const generatePriceLimit = (userLimit?: Partial<PriceLimit>): PriceLimit => ({
  max: userLimit?.max ? userLimit.max : null,
  min: userLimit?.min ? userLimit.min : null
});

describe('Product filter functions', () => {
  describe('function \'isExistsByCategoryFilter\'', () => {
    it.each<CategoryFilterEachArg>([
      { selectedValue: ProductCategory.VideoCamera, productCharacteristic: ProductCategory.VideoCamera, expectedResult: true },
      { selectedValue: null, productCharacteristic: ProductCategory.VideoCamera, expectedResult: true },
      { selectedValue: ProductCategory.PhotoCamera, productCharacteristic: ProductCategory.VideoCamera, expectedResult: false },
      { selectedValue: ProductCategory.PhotoCamera, productCharacteristic: ProductCategory.PhotoCamera, expectedResult: true },
      { selectedValue: null, productCharacteristic: ProductCategory.PhotoCamera, expectedResult: true },
      { selectedValue: ProductCategory.VideoCamera, productCharacteristic: ProductCategory.PhotoCamera, expectedResult: false }
    ])('should return $expectedResult by selectedCategory=$selectedValue and product.category=$productCharacteristic',
      ({ expectedResult, productCharacteristic, selectedValue }) => {
        const productMock = generateProductMock();
        productMock.category = productCharacteristic;

        const result = isExistsByCategoryFilter(productMock, selectedValue);

        expect(result).toBe(expectedResult);
      });
  });

  describe('function \'isExistsProductByTypeFilter\'', () => {
    it.each<TypeFilterEachArg>([
      { selectedValue: generateTypeFilterFields(), expectedResult: true, productCharacteristic: ProductType.Collection },
      { selectedValue: generateTypeFilterFields(), expectedResult: true, productCharacteristic: ProductType.Digital },
      { selectedValue: generateTypeFilterFields(), expectedResult: true, productCharacteristic: ProductType.Film },
      { selectedValue: generateTypeFilterFields(), expectedResult: true, productCharacteristic: ProductType.Momental },
      { selectedValue: generateTypeFilterFields({ hasCollectionType: true }), expectedResult: true, productCharacteristic: ProductType.Collection },
      { selectedValue: generateTypeFilterFields({ hasDigitalType: true }), expectedResult: false, productCharacteristic: ProductType.Collection },
      { selectedValue: generateTypeFilterFields({ hasFilmType: true }), expectedResult: false, productCharacteristic: ProductType.Collection },
      { selectedValue: generateTypeFilterFields({ hasFilmType: true, hasCollectionType: true }), expectedResult: true, productCharacteristic: ProductType.Collection },
      { selectedValue: generateTypeFilterFields({ hasDigitalType: true }), expectedResult: true, productCharacteristic: ProductType.Digital },
      { selectedValue: generateTypeFilterFields({ hasCollectionType: true }), expectedResult: false, productCharacteristic: ProductType.Digital },
      { selectedValue: generateTypeFilterFields({ hasFilmType: true }), expectedResult: false, productCharacteristic: ProductType.Digital },
      { selectedValue: generateTypeFilterFields({ hasDigitalType: true, hasCollectionType: true }), expectedResult: true, productCharacteristic: ProductType.Digital },
      { selectedValue: generateTypeFilterFields({ hasFilmType: true }), expectedResult: true, productCharacteristic: ProductType.Film },
      { selectedValue: generateTypeFilterFields({ hasCollectionType: true }), expectedResult: false, productCharacteristic: ProductType.Film },
      { selectedValue: generateTypeFilterFields({ hasDigitalType: true }), expectedResult: false, productCharacteristic: ProductType.Film },
      { selectedValue: generateTypeFilterFields({ hasFilmType: true, hasCollectionType: true }), expectedResult: true, productCharacteristic: ProductType.Film },
      { selectedValue: generateTypeFilterFields({ hasMomentalType: true }), expectedResult: true, productCharacteristic: ProductType.Momental },
      { selectedValue: generateTypeFilterFields({ hasCollectionType: true }), expectedResult: false, productCharacteristic: ProductType.Momental },
      { selectedValue: generateTypeFilterFields({ hasDigitalType: true }), expectedResult: false, productCharacteristic: ProductType.Momental },
      { selectedValue: generateTypeFilterFields({ hasFilmType: true, hasMomentalType: true }), expectedResult: true, productCharacteristic: ProductType.Momental },
    ])('should return $expectedResult by filterFields=$selectedValue and productType=$productType',
      ({ expectedResult, selectedValue, productCharacteristic }) => {
        const productMock = generateProductMock();
        productMock.type = productCharacteristic;

        const result = isExistsProductByTypeFilter(productMock, selectedValue);

        expect(result).toBe(expectedResult);
      });
  });

  describe('function \'isExistsByUserLevelFilter\'', () => {
    it.each<UserLevelFilterEachArg>([
      { selectedValue: generateUserLevelFilterFields(), expectedResult: true, productCharacteristic: RecommendedUserLevel.Amateur },
      { selectedValue: generateUserLevelFilterFields(), expectedResult: true, productCharacteristic: RecommendedUserLevel.Beginner },
      { selectedValue: generateUserLevelFilterFields(), expectedResult: true, productCharacteristic: RecommendedUserLevel.Professional },
      { selectedValue: generateUserLevelFilterFields({ hasAmateurLevel: true }), expectedResult: true, productCharacteristic: RecommendedUserLevel.Amateur },
      { selectedValue: generateUserLevelFilterFields({ hasBeginnerLevel: true }), expectedResult: false, productCharacteristic: RecommendedUserLevel.Amateur },
      { selectedValue: generateUserLevelFilterFields({ hasProfessionalLevel: true }), expectedResult: false, productCharacteristic: RecommendedUserLevel.Amateur },
      { selectedValue: generateUserLevelFilterFields({ hasBeginnerLevel: true, hasAmateurLevel: true }), expectedResult: true, productCharacteristic: RecommendedUserLevel.Amateur },
      { selectedValue: generateUserLevelFilterFields({ hasBeginnerLevel: true }), expectedResult: true, productCharacteristic: RecommendedUserLevel.Beginner },
      { selectedValue: generateUserLevelFilterFields({ hasAmateurLevel: true }), expectedResult: false, productCharacteristic: RecommendedUserLevel.Beginner },
      { selectedValue: generateUserLevelFilterFields({ hasProfessionalLevel: true }), expectedResult: false, productCharacteristic: RecommendedUserLevel.Beginner },
      { selectedValue: generateUserLevelFilterFields({ hasBeginnerLevel: true, hasAmateurLevel: true }), expectedResult: true, productCharacteristic: RecommendedUserLevel.Beginner },
      { selectedValue: generateUserLevelFilterFields({ hasProfessionalLevel: true }), expectedResult: true, productCharacteristic: RecommendedUserLevel.Professional },
      { selectedValue: generateUserLevelFilterFields({ hasAmateurLevel: true }), expectedResult: false, productCharacteristic: RecommendedUserLevel.Professional },
      { selectedValue: generateUserLevelFilterFields({ hasBeginnerLevel: true }), expectedResult: false, productCharacteristic: RecommendedUserLevel.Professional },
      { selectedValue: generateUserLevelFilterFields({ hasProfessionalLevel: true, hasAmateurLevel: true }), expectedResult: true, productCharacteristic: RecommendedUserLevel.Professional },
    ])('should return $expectedResult by filterFields=$selectedValue and product user level=$productCharacteristic',
      ({ expectedResult, productCharacteristic, selectedValue }) => {
        const productMock = generateProductMock();
        productMock.level = productCharacteristic;

        const result = isExistsByUserLevelFilter(productMock, selectedValue);

        expect(result).toBe(expectedResult);
      });
  });

  describe('function \'isExistsProductByPriceFilter\'', () => {
    const productMock = generateProductMock();

    it.each<PriceLimiitFilterEachArg>([
      {
        selectedValue: generatePriceLimit(),
        expectedResult: true
      },
      {
        selectedValue: generatePriceLimit({
          min: faker.datatype.number({ min: DefaultPriceValues.priceBegin, max: productMock.price })
        }),
        expectedResult: true
      },
      {
        selectedValue: generatePriceLimit({
          max: faker.datatype.number({ min: productMock.price, max: DefaultPriceValues.priceEnd })
        }),
        expectedResult: true
      },
      {
        selectedValue: generatePriceLimit({
          min: faker.datatype.number({ min: productMock.price + 1, max: DefaultPriceValues.priceEnd })
        }),
        expectedResult: false
      },
      {
        selectedValue: generatePriceLimit({
          max: faker.datatype.number({ min: DefaultPriceValues.priceBegin, max: productMock.price - 1 })
        }),
        expectedResult: false
      },
    ])('should return $expectedResult by price limits=$selectedValue',
      ({ expectedResult, selectedValue }) => {
        const result = isExistsProductByPriceFilter(productMock, selectedValue);

        expect(result).toBe(expectedResult);
      });
  });
});
