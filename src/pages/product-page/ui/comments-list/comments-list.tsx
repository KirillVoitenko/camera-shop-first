import { CommentCard } from '@entities/comment';
import {
  COMMENTS_IN_ONE_PRINT,
  REVIEWS_EMPTY_SECTION_TEST_ID,
  REVIEWS_LIST_TEST_ID
} from '@pages/product-page/config/const';
import { productCommentsSelector } from '@pages/product-page/model/product-slice';
import { useAppSelector } from '@shared/lib/store';
import { JSX, useEffect, useRef, useState } from 'react';

const INTERSECTION_OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 1
};

export function CommentsList(): JSX.Element {
  const showMoreButtonRef = useRef<HTMLButtonElement>(null);
  const comments = useAppSelector(productCommentsSelector);
  const [printedCommentsCount, setPrintedCommentsCount] = useState(Math.min(comments.length, COMMENTS_IN_ONE_PRINT));

  const renderMoreComments = () => {
    setPrintedCommentsCount((previous) => Math.min(comments.length, previous + COMMENTS_IN_ONE_PRINT));
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

  const printedComments = comments.slice(0, printedCommentsCount);

  return printedComments.length > 0
    ? (
      <>
        <ul className='review-block__list' data-testid={REVIEWS_LIST_TEST_ID}>
          {printedComments.map((current) => <CommentCard comment={current} key={current.id} />)}
        </ul>
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
