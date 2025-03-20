import { ComponentProps, PropsWithChildren, JSX } from 'react';
import { Modal } from '../modal';
import { render } from '@testing-library/react';
import { CLOSE_BUTTON_TEST_ID, MODAL_CONTAINER_TEST_ID, MODAL_OVERLAY_TEST_ID } from '../const';
import faker from 'faker';
import userEvent from '@testing-library/user-event';

vi.mock('focus-trap-react', () => ({
  // eslint-disable-next-line react/jsx-no-useless-fragment
  FocusTrap: vi.fn<[PropsWithChildren], JSX.Element>(({children}) => <>{children}</>)
}));

const FAKE_MODAL_CONTENT_TEXT = faker.lorem.paragraph();

describe('Component \'Modal\'', () => {
  const modalCloseButtonClickHandlerMock = vi.fn();
  const fakeModalContent = <p>{FAKE_MODAL_CONTENT_TEXT}</p>;

  beforeEach(() => {
    modalCloseButtonClickHandlerMock.mockReset();
  });

  it('should correct render if opened', () => {
    const modalProps: ComponentProps<typeof Modal> = {
      isOpened: true,
      onClose: modalCloseButtonClickHandlerMock
    };

    const screen = render(
      <Modal {...modalProps}>
        {fakeModalContent}
      </Modal>
    );

    expect(screen.getByTestId(MODAL_CONTAINER_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(CLOSE_BUTTON_TEST_ID)).toBeInTheDocument();
  });

  it('should correct render if closed', () => {
    const modalProps: ComponentProps<typeof Modal> = {
      isOpened: false,
      onClose: modalCloseButtonClickHandlerMock
    };

    const screen = render(
      <Modal {...modalProps}>
        {fakeModalContent}
      </Modal>
    );

    expect(screen.queryByTestId(MODAL_CONTAINER_TEST_ID)).toBeNull();
    expect(screen.queryByTestId(CLOSE_BUTTON_TEST_ID)).toBeNull();
  });

  describe('should call \'onClose\' callback', () => {
    it.each([
      {elementName: 'close button', testId: CLOSE_BUTTON_TEST_ID},
      {elementName: 'overlay', testId: MODAL_OVERLAY_TEST_ID}
    ])('by $elementName click', async ({testId}) => {
      const modalProps: ComponentProps<typeof Modal> = {
        isOpened: true,
        onClose: modalCloseButtonClickHandlerMock
      };

      const screen = render(
        <Modal {...modalProps}>
          {fakeModalContent}
        </Modal>
      );

      await userEvent.click(
        screen.getByTestId(testId)
      );

      expect(modalCloseButtonClickHandlerMock).toBeCalled();
    });

    it.each([
      { key: 'X', code: '[KeyX]' },
      { key: 'Escape', code: '[Escape]' }
    ])('by key $key pressed', async ({code}) => {
      const modalProps: ComponentProps<typeof Modal> = {
        isOpened: true,
        onClose: modalCloseButtonClickHandlerMock
      };

      const screen = render(
        <Modal {...modalProps}>
          {fakeModalContent}
        </Modal>
      );

      await userEvent.type(screen.container, code);

      expect(modalCloseButtonClickHandlerMock).toBeCalled();
    });
  });
});
