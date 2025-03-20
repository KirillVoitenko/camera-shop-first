import { Comment } from '@entities/comment';
import faker from 'faker';

export const generateCommentMock = (): Comment => ({
  cameraId: faker.datatype.number(),
  advantage: faker.lorem.sentence(),
  disadvantage: faker.lorem.sentence(),
  createAt: faker.datatype.datetime().toUTCString(),
  id: faker.datatype.uuid(),
  rating: faker.datatype.number({min: 1, max: 5}),
  review: faker.lorem.paragraph(),
  userName: faker.internet.userName()
});
