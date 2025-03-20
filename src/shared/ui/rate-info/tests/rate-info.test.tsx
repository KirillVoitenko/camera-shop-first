import { render } from '@testing-library/react';
import { RateInfo } from '../rate-info';
import { ComponentProps } from 'react';
import faker from 'faker';

const STAR_TEST_ID = 'rating-star-icon';
const RATE_CONTAINER_TEST_ID = 'rate-container';

const PROPS_MOCK: ComponentProps<typeof RateInfo> = {
  averageRating: faker.datatype.number({max: 5}),
  reviewsCount: faker.datatype.number(),
  showRateCount: true
};

describe('Component \'RateInfo\'', () => {
  it('should correct render by show rate count', () => {
    const screen = render(<RateInfo {...PROPS_MOCK}/>);

    expect(screen.getByTestId(RATE_CONTAINER_TEST_ID)).toBeInTheDocument();
    expect(screen.queryAllByTestId(STAR_TEST_ID).length).toBe(PROPS_MOCK.averageRating);
    expect(screen.getByText(PROPS_MOCK.reviewsCount)).toBeInTheDocument();
  });

  it('should correct render by \'reviewsCount\' = 0', () => {
    PROPS_MOCK.showRateCount = false;
    const screen = render(<RateInfo {...PROPS_MOCK}/>);

    expect(screen.getByTestId(RATE_CONTAINER_TEST_ID)).toBeInTheDocument();
    expect(screen.queryAllByTestId(STAR_TEST_ID).length).toBe(PROPS_MOCK.averageRating);
    expect(screen.queryByText(PROPS_MOCK.reviewsCount)).toBeNull();
  });
});
