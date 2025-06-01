import { render } from '@testing-library/react';
import { CommentCreateSuccessModalContent } from '../comment-create-success-modal-content';
import userEvent from '@testing-library/user-event';

const TITLE_TEXT_PATTERN = /спасибо за отзыв/gmi;
const ICON_TEST_ID = 'comment-add-success-icon';
const SUBMIT_BUTTON_TEXT_PATTERN = /вернуться к покупкам/gmi;

describe('component \'CommentCreateSuccessModalContent\'', () => {
  const onActionClickMock = vi.fn();

  beforeEach(() => {
    onActionClickMock.mockReset();
  });

  it('should correct render', () => {
    const screen = render(<CommentCreateSuccessModalContent onActionClick={onActionClickMock} />);

    expect(screen.getByTestId(ICON_TEST_ID)).toBeInTheDocument();
    expect(screen.getByText(TITLE_TEXT_PATTERN)).toBeInTheDocument();
    expect(screen.getByText(SUBMIT_BUTTON_TEXT_PATTERN)).toBeInTheDocument();
  });

  it('should call \'onActionClick\' callback by action button click', async () => {
    const screen = render(<CommentCreateSuccessModalContent onActionClick={onActionClickMock} />);
    const actionButton = screen.getByText(SUBMIT_BUTTON_TEXT_PATTERN);

    await userEvent.click(actionButton);

    expect(onActionClickMock).toBeCalledTimes(1);
  });
});
