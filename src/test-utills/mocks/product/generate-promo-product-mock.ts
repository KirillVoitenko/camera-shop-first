import type { PromoProduct } from '@entities/product/model/types';
import faker from 'faker';

export const generatePromoProductMock = (): PromoProduct => ({
  id: faker.datatype.number(),
  name: faker.lorem.word(),
  previewImg: faker.image.imageUrl(),
  previewImg2x: faker.image.imageUrl(),
  previewImgWebp: faker.image.imageUrl(),
  previewImgWebp2x: faker.image.imageUrl(),
});
