import { render } from '@testing-library/react';
import { Preview } from '../preview';
import { ComponentProps } from 'react';
import faker from 'faker';

const PREVIEW_CONTAINER_TEST_ID = 'preview-container';

const PROPS_MOCK: ComponentProps<typeof Preview> = {
  image: {
    srcSet: faker.image.imageUrl(),
    src: faker.image.imageUrl(),
    alt: faker.lorem.words(),
  },
  source: {
    srcSet: faker.image.imageUrl(),
    src: faker.image.imageUrl(),
  }
};

describe('Component \'Preview\'', () => {
  it('should correct render', () => {
    const screen = render(<Preview {...PROPS_MOCK} />);

    expect(screen.getByTestId(PREVIEW_CONTAINER_TEST_ID)).toBeInTheDocument();
    expect(screen.getByAltText(PROPS_MOCK.image?.alt ?? '')).toBeInTheDocument();
  });
});
