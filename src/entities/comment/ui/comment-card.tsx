import { Classed } from '@shared/model/style-types';
import { JSX } from 'react';
import { Comment } from '../model/types';
import classNames from 'classnames';
import { COMMENT_CARD_TEST_ID } from '../config/const';
import { RateInfo } from '@shared/ui/rate-info';
import dayjs from '@shared/lib/dayjs';

type CommentCardProps = Classed<{
  comment: Comment;
}>

export function CommentCard({ comment, className }: CommentCardProps): JSX.Element {
  const containerClassName = classNames('review-card', className);
  const commentCreated = dayjs(comment.createAt);

  return (
    <li className={containerClassName} data-testid={COMMENT_CARD_TEST_ID}>
      <div className='review-card__head'>
        <p className='title title--h4'>
          {comment.userName}
        </p>
        <time className='review-card__data' dateTime={commentCreated.format('YYYY-MM-DD')}>
          {commentCreated.format('DD MMMM')}
        </time>
      </div>
      <RateInfo
        className='review-card__rate'
        averageRating={comment.rating}
        reviewsCount={0}
        showRateCount={false}
      />
      <ul className='review-card__list'>
        <li className='item-list'>
          <span className='item-list__title'>
            Достоинства:
          </span>
          <p className='item-list__text'>
            {comment.advantage}
          </p>
        </li>
        <li className='item-list'>
          <span className='item-list__title'>
            Недостатки:
          </span>
          <p className='item-list__text'>
            {comment.disadvantage}
          </p>
        </li>
        <li className='item-list'>
          <span className='item-list__title'>
            Комментарий:
          </span>
          <p className='item-list__text'>
            {comment.review}
          </p>
        </li>
      </ul>
    </li>
  );
}
