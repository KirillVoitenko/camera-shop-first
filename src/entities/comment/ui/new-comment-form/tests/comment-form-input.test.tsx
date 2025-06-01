import { render } from '@testing-library/react';
import { CommentFormInput } from '../comment-form-input';
import faker from 'faker';
import { NewComment } from '@entities/comment/model/types';
import { UseFormRegister } from 'react-hook-form';
import userEvent from '@testing-library/user-event';

const FAKE_CAPTION = faker.datatype.string();
const FAKE_ERROR_TEXT = faker.lorem.sentence();

describe('component \'CommentFormInput\'', () => {
  const registerMock: UseFormRegister<NewComment> = (name) => ({
    name,
    onBlur: vi.fn(),
    onChange: vi.fn(),
    ref: vi.fn()
  });
  const inputName: keyof NewComment = 'advantage';

  it('should correct render with error', () => {
    const screen = render(<CommentFormInput caption={FAKE_CAPTION} name={inputName} register={registerMock} error={{type: 'max', message: FAKE_ERROR_TEXT}} />);

    expect(screen.getByText(FAKE_CAPTION)).toBeInTheDocument();
    expect(screen.container.querySelector('input')?.name).toBe(inputName);
    expect(screen.getByText(FAKE_ERROR_TEXT)).toBeInTheDocument();
  });

  it('should correct render without error', () => {
    const screen = render(<CommentFormInput caption={FAKE_CAPTION} name={inputName} register={registerMock} />);

    expect(screen.getByText(FAKE_CAPTION)).toBeInTheDocument();
    expect(screen.container.querySelector('input')?.name).toBe(inputName);
    expect(screen.queryByText(FAKE_ERROR_TEXT)).toBeNull();
  });

  it('input should support user interrupt', async () => {
    const fakeText = faker.lorem.sentence();
    const screen = render(<CommentFormInput caption={FAKE_CAPTION} name={inputName} register={registerMock} />);
    const inputElement = screen.container.querySelector('input');

    if (inputElement) {
      await userEvent.type(inputElement, fakeText);

      expect(screen.getByDisplayValue(fakeText)).toBeInTheDocument();
      return;
    }
    throw new Error('input not found');
  });
});
