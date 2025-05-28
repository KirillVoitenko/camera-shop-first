import { render } from '@testing-library/react';
import { RatingInput } from '../rating-input';
import faker from 'faker';
import { RatingValidRange } from '@entities/comment/config/const';
import { RATING_INPUTS_CONFIG } from '@entities/comment/config/const';

const FAKE_ERROR_MESSAGE = faker.lorem.sentence();

describe('component \'RatingInput\'', () => {
  const registerMock = vi.fn();
  const watchMock = vi.fn().mockImplementation(() => faker.datatype.number({max: RatingValidRange.Maximal, min: RatingValidRange.Minimal}));

  beforeEach(() => {
    registerMock.mockReset();
    watchMock.mockReset();
  });

  it('should correct render with error', () => {
    const screen = render(<RatingInput register={registerMock} watch={watchMock} error={{type: 'required', message: FAKE_ERROR_MESSAGE}}/>);
    const inputElements = Array.from(screen.container.querySelectorAll('input[type=radio]'));

    RATING_INPUTS_CONFIG.forEach((current) => {
      const currentInput = inputElements.find((input) => input.id === current.id);
      expect(currentInput).not.toBeUndefined();
    });

    expect(screen.getByText(FAKE_ERROR_MESSAGE)).toBeInTheDocument();
  });

  it('should correct render without error', () => {
    const screen = render(<RatingInput register={registerMock} watch={watchMock} />);
    const inputElements = Array.from(screen.container.querySelectorAll('input[type=radio]'));

    RATING_INPUTS_CONFIG.forEach((current) => {
      const currentInput = inputElements.find((input) => input.id === current.id);
      expect(currentInput).not.toBeUndefined();
    });

    expect(screen.queryByText(FAKE_ERROR_MESSAGE)).toBeNull();
  });
});
