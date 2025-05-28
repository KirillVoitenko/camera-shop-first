import { render } from '@testing-library/react';
import { NewCommentForm } from '../new-comment-form';
import faker from 'faker';
import userEvent from '@testing-library/user-event';

const RATING_INPUT_TEST_ID = 'new-comment-rating';
const AUTHOR_INPUT_PLACEHOLDER = /введите ваше имя/gmi;
const ADVENTAGE_INPUT_PLACEHOLDER = /основные преимущества товара/gmi;
const DISADVENTAGE_INPUT_PLACEHOLDER = /главные недостатки товара/gmi;
const REVIEW_TEXTAREA_PLACEHOLDER = /поделитесь своим опытом покупки/gmi;
const SUBMIT_BUTTON_TEXT = /отправить отзыв/gmi;
const FAKE_PRODUCT_ID = faker.datatype.number();

type InterruptEachArg = {
  inputPlaceholder: RegExp;
  inputName: string;
}

describe('component \'NewCommentForm\'', () => {
  const onSubmitMock = vi.fn();

  beforeEach(() => {
    onSubmitMock.mockReset();
  });

  it('should correct render', () => {
    const screen = render(<NewCommentForm productId={FAKE_PRODUCT_ID} onSubmit={onSubmitMock} />);

    expect(screen.getByTestId(RATING_INPUT_TEST_ID)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(AUTHOR_INPUT_PLACEHOLDER)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(ADVENTAGE_INPUT_PLACEHOLDER)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(DISADVENTAGE_INPUT_PLACEHOLDER)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(REVIEW_TEXTAREA_PLACEHOLDER)).toBeInTheDocument();
    expect(screen.getByText(SUBMIT_BUTTON_TEXT)).toBeInTheDocument();
  });

  it.each<InterruptEachArg>([
    { inputName: 'authorName', inputPlaceholder: AUTHOR_INPUT_PLACEHOLDER },
    { inputName: 'adventage', inputPlaceholder: ADVENTAGE_INPUT_PLACEHOLDER },
    { inputName: 'disadventage', inputPlaceholder: DISADVENTAGE_INPUT_PLACEHOLDER },
    { inputName: 'review', inputPlaceholder: REVIEW_TEXTAREA_PLACEHOLDER }
  ])('input $inputName should support user interrupt', async ({ inputPlaceholder }) => {
    const inputText = faker.lorem.words(3);
    const screen = render(<NewCommentForm productId={FAKE_PRODUCT_ID} onSubmit={onSubmitMock} />);
    const input = screen.getByPlaceholderText(inputPlaceholder);

    await userEvent.type(input, inputText);

    expect(screen.getByDisplayValue(inputText)).toBeInTheDocument();
  });

  it('should call \'onSubmit\' callback if submit button click by valid form', async () => {
    const fakeText = faker.lorem.sentence();
    const screen = render(<NewCommentForm productId={FAKE_PRODUCT_ID} onSubmit={onSubmitMock} />);

    const ratingInput = screen.getByTestId(RATING_INPUT_TEST_ID).querySelector('input[type=radio]');

    if (ratingInput) {
      await userEvent.click(ratingInput);
      await userEvent.type(screen.getByPlaceholderText(AUTHOR_INPUT_PLACEHOLDER), fakeText);
      await userEvent.type(screen.getByPlaceholderText(ADVENTAGE_INPUT_PLACEHOLDER), fakeText);
      await userEvent.type(screen.getByPlaceholderText(DISADVENTAGE_INPUT_PLACEHOLDER), fakeText);
      await userEvent.type(screen.getByPlaceholderText(REVIEW_TEXTAREA_PLACEHOLDER), fakeText);

      await userEvent.click(screen.getByText(SUBMIT_BUTTON_TEXT));
      expect(onSubmitMock).toBeCalledTimes(1);
      return;
    }

    throw new Error('rating input not found');
  });

  it('should not call \'onSubmit\' callback if submit button click by no valid form', async () => {
    const fakeText = faker.lorem.sentence();
    const screen = render(<NewCommentForm productId={FAKE_PRODUCT_ID} onSubmit={onSubmitMock} />);

    await userEvent.type(screen.getByPlaceholderText(DISADVENTAGE_INPUT_PLACEHOLDER), fakeText);
    await userEvent.type(screen.getByPlaceholderText(REVIEW_TEXTAREA_PLACEHOLDER), fakeText);
    await userEvent.click(screen.getByText(SUBMIT_BUTTON_TEXT));

    expect(onSubmitMock).not.toBeCalled();
  });
});
