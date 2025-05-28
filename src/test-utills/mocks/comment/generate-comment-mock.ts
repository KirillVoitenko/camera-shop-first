import { Comment } from '@entities/comment';
import { NewComment } from '@entities/comment/model/types';
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

export const generateNewCommentDataMock = (cameraId: number): NewComment => ({
  cameraId,
  advantage: faker.lorem.sentence(),
  disadvantage: faker.lorem.sentence(),
  rating: faker.datatype.number({min: 1, max: 5}),
  review: faker.lorem.paragraph(),
  userName: faker.name.title(),
});
