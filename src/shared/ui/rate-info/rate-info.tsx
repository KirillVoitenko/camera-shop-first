import { ElementSize } from '@shared/model/html';
import { Classed } from '@shared/model/style-types';
import classNames from 'classnames';
import { JSX } from 'react';
import { SvgIcon } from '../svg-icon';

type RateInfoProps = Classed<{
  averageRating: number;
  reviewsCount: number;
  iconSize?: ElementSize;
  showRateCount?: boolean;
}>

const DEFAULT_ICON_SIZE: ElementSize = {
  height: 16,
  width: 17
};

export function RateInfo({ averageRating, reviewsCount, className, iconSize = DEFAULT_ICON_SIZE, showRateCount = true }: RateInfoProps): JSX.Element {
  const containerClassName = classNames('rate', className);
  return (
    <div className={containerClassName} data-testid='rate-container'>
      {Array.from({ length: averageRating }).map((_, index) => {
        const starKey = `$rating-star-${index}`;
        return (
          <SvgIcon key={starKey} size={iconSize} xlinkHref='#icon-full-star' testId='rating-star-icon' />
        );
      })}

      <p className='visually-hidden'>
        {`Рейтинг: ${averageRating}`}
      </p>
      {!!showRateCount && (
        <p className='rate__count'>
          <span className='visually-hidden'>
            Всего оценок:
          </span>
          {reviewsCount}
        </p>
      )}
    </div>
  );
}
