import { Product, ProductCategory, ProductType, RecommendedUserLevel } from '@entities/product';
import faker from 'faker';

export const generateProductMock = (): Product => ({
  category: ProductCategory.PhotoCamera,
  description: faker.lorem.sentence(),
  id: faker.datatype.number(faker.datatype.number({min: 3, max: 10})),
  level: RecommendedUserLevel.Beginner,
  name: faker.lorem.word(),
  previewImg: faker.image.imageUrl(),
  previewImg2x: faker.image.imageUrl(),
  previewImgWebp: faker.image.imageUrl(),
  previewImgWebp2x: faker.image.imageUrl(),
  price: faker.datatype.number(),
  rating: faker.datatype.number({max: 5}),
  reviewCount: faker.datatype.number(),
  type: ProductType.Digital,
  vendorCode: faker.datatype.string()
});
