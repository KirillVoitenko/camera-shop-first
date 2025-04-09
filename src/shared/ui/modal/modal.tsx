import { FC, MouseEventHandler, PropsWithChildren, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import { Classed } from '@shared/model/style-types';
import { ElementSize } from '@shared/model/html';
import { Content } from './content';
import { CLOSE_BUTTON_TEST_ID, MODAL_CONTAINER_TEST_ID, MODAL_OVERLAY_TEST_ID } from './const';
import { FocusTrap } from 'focus-trap-react';
import { SvgIcon } from '../svg-icon';
import { MouseButtonEnum } from '@shared/model/enums';

type ModalExtensions = {
  Content: typeof Content;
}

type ModalProps = Classed<PropsWithChildren<{
  onClose: () => void;
  isOpened: boolean;
}>>;

const CLOSE_BUTTON_SIZE: ElementSize = {
  height: 10,
  width: 10,
};

enum KeyByClose {
  Escape = 'Escape',
  X = 'KeyX'
}

export const Modal: FC<ModalProps> & ModalExtensions = ({ onClose, className, children, isOpened }: ModalProps) => {
  const modalCloseButtonClickHandler = useCallback(
    () => {
      onClose();
    },
    [onClose]
  );
  const modalContainerClassName = classNames('modal', className, { 'is-active': isOpened });

  const modalOverlayMouseUpHandler: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (event.button === MouseButtonEnum.Main) {
        onClose();
      }
    },
    [onClose]
  );

  const documentKeydownHandler = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === KeyByClose.Escape || event.code === KeyByClose.X && !(event.target instanceof HTMLInputElement)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(
    () => {
      if (isOpened) {
        document.body.classList.add('scroll-lock');
        document.addEventListener('keydown', documentKeydownHandler);
      }

      return () => {
        document.body.classList.remove('scroll-lock');
        document.removeEventListener('keydown', documentKeydownHandler);
      };
    },
    [documentKeydownHandler, isOpened]
  );

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isOpened && (
        <div className={modalContainerClassName} data-testid={MODAL_CONTAINER_TEST_ID}>
          <div className='modal__wrapper'>
            <div className='modal__overlay' onMouseUp={modalOverlayMouseUpHandler} data-testid={MODAL_OVERLAY_TEST_ID}></div>
            <FocusTrap>
              <div className='modal__content'>
                {children}
                <button
                  className='cross-btn'
                  type='button'
                  aria-label='Закрыть попап'
                  onClick={modalCloseButtonClickHandler}
                  data-testid={CLOSE_BUTTON_TEST_ID}
                >
                  <SvgIcon size={CLOSE_BUTTON_SIZE} xlinkHref='#icon-close' />
                </button>
              </div>
            </FocusTrap>
          </div>
        </div >
      )}
    </>
  );
};

Modal.Content = Content;
Modal.displayName = 'modal-window';
