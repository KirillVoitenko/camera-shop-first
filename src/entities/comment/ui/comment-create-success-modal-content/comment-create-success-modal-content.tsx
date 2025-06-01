import { ElementSize } from '@shared/model/html';
import { Modal } from '@shared/ui/modal';
import { SvgIcon } from '@shared/ui/svg-icon';
import { JSX } from 'react';

type CommentCreateSuccessModalContentProps = {
  onActionClick: () => void;
}

const ICON_SIZE: ElementSize = {
  height: 78,
  width: 80
};

export function CommentCreateSuccessModalContent({ onActionClick }: CommentCreateSuccessModalContentProps): JSX.Element {
  return (
    <Modal.Content
      title='Спасибо за отзыв'
    >
      <SvgIcon
        size={ICON_SIZE}
        xlinkHref='#icon-review-success'
        testId='comment-add-success-icon'
        className='modal__icon'
      />
      <div className='modal__buttons'>
        <button
          onClick={onActionClick}
          className='btn btn--purple modal__btn modal__btn--fit-width'
          type='button'
        >
          Вернуться к покупкам
        </button>
      </div>
    </Modal.Content>
  );
}
