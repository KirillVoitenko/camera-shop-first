import { CommentCard, CommentCreateSuccessModalContent, NewCommentForm } from '@entities/comment';
import { NewComment } from '@entities/comment/model/types';
import {
  COMMENTS_IN_ONE_PRINT,
  REVIEWS_EMPTY_SECTION_TEST_ID,
  REVIEWS_LIST_TEST_ID
} from '@pages/product-page/config/const';
import { productCommentsSelector } from '@pages/product-page/model/product-slice';
import { addNewCommentAction } from '@pages/product-page/model/product-slice/actions';
import { useAppDispatch, useAppSelector } from '@shared/lib/store';
import { AppRoutesEnum } from '@shared/model/enums';
import { Modal } from '@shared/ui/modal';
import { TOAST_CONTAINER_ID } from '@shared/ui/toast-container';
import { JSX, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const INTERSECTION_OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 1
};

type CommentsListProps = {
  productId: number;
}

export function CommentsList({ productId }: CommentsListProps): JSX.Element {
  const showMoreButtonRef = useRef<HTMLButtonElement>(null);
  const comments = useAppSelector(productCommentsSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [printedCommentsCount, setPrintedCommentsCount] = useState(Math.min(comments.length, COMMENTS_IN_ONE_PRINT));
  const [newCommentFormVisible, setNewCommentFormVisible] = useState<boolean>(false);
  const [addNewCommentSuccessVisible, setAddNewCommentSuccessVisible] = useState<boolean>(false);
  const sortedComments = [...comments].sort((first, second) => {
    const firstCommentCreationDate = Date.parse(first.createAt);
    const secondCommentCreationDate = Date.parse(second.createAt);
    return secondCommentCreationDate - firstCommentCreationDate;
  });

  const closeNewCommentForm = () => setNewCommentFormVisible(false);
  const closeAddNewCommentSuccessModal = () => setAddNewCommentSuccessVisible(false);

  const renderMoreComments = () => {
    setPrintedCommentsCount((previous) => Math.min(comments.length, previous + COMMENTS_IN_ONE_PRINT));
  };

  const submitNewCommentFormHandler = async (data: NewComment) => {
    const dispatchedAction = await dispatch(addNewCommentAction(data));

    if (dispatchedAction.type === addNewCommentAction.rejected.type) {
      toast.error('Не удалось создать комметарий! Попробуйте ещё раз', {
        containerId: TOAST_CONTAINER_ID
      });
      return;
    }
    setAddNewCommentSuccessVisible(true);
    closeNewCommentForm();
  };

  const addNewCommentSuccessActionClickHandler = () => {
    closeAddNewCommentSuccessModal();
    navigate(AppRoutesEnum.Main);
  };

  const intersectionObserverCallback: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        renderMoreComments();
      }
    });
  };

  const intersectionObserver = new IntersectionObserver(intersectionObserverCallback, INTERSECTION_OBSERVER_OPTIONS);

  useEffect(
    () => {
      if (showMoreButtonRef.current) {
        intersectionObserver.observe(showMoreButtonRef.current);
      }

      return () => {
        intersectionObserver.disconnect();
      };
    },
  );

  const printedComments = sortedComments.slice(0, printedCommentsCount);

  return printedComments.length > 0
    ? (
      <>
        <div className='page-content__headed'>
          <h2 className='title title--h3'>
            Отзывы
          </h2>
          <button
            className='btn'
            type='button'
            onClick={() => setNewCommentFormVisible(true)}
          >
            Оставить свой отзыв
          </button>
        </div>
        <ul className='review-block__list' data-testid={REVIEWS_LIST_TEST_ID}>
          {printedComments.map((current) => <CommentCard comment={current} key={current.id} />)}
        </ul>
        <Modal
          isOpened={newCommentFormVisible}
          onClose={closeNewCommentForm}
        >
          <Modal.Content
            title='Оставить отзыв'
          >
            <NewCommentForm productId={productId} onSubmit={submitNewCommentFormHandler} />
          </Modal.Content>
        </Modal>
        <Modal
          className='modal--narrow'
          isOpened={addNewCommentSuccessVisible}
          onClose={closeAddNewCommentSuccessModal}
        >
          <CommentCreateSuccessModalContent onActionClick={addNewCommentSuccessActionClickHandler}/>
        </Modal>
        {printedComments.length < comments.length && (
          <div className='review-block__buttons'>
            <button ref={showMoreButtonRef} className='btn btn--purple' type='button' onClick={() => renderMoreComments()}>
              Показать больше отзывов
            </button>
          </div>
        )}
      </>
    )
    : (
      <p data-testid={REVIEWS_EMPTY_SECTION_TEST_ID}>
        Будьте первым, кто оставит отзыв!
      </p>
    );
}
