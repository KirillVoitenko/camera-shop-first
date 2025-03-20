import { ElementSize } from '@shared/model/html';
import classNames from 'classnames';
import { CSSProperties, JSX, forwardRef, PropsWithRef } from 'react';

type ArrowType = 'next' | 'previous';

type ArrowProps = PropsWithRef<{
  type: ArrowType;
}>

const BUTTON_STYLES: CSSProperties = {
  zIndex: 3,
  pointerEvents: 'auto'
};

const ARROW_SIZE: ElementSize = {
  height: 12,
  width: 7
};

export const Arrow = forwardRef<HTMLButtonElement, ArrowProps>(({ type }, ref): JSX.Element => {
  const buttonClassName = classNames(
    'slider-controls',
    {
      'slider-controls--prev': type === 'previous',
      'slider-controls--next': type === 'next',
    }
  );

  const labelText = type === 'next' ? 'Следующий слайд' : 'Предыдущий слайд';

  return (
    <button
      ref={ref}
      className={buttonClassName}
      type='button'
      aria-label={labelText}
      style={BUTTON_STYLES}
    >
      <svg width={ARROW_SIZE.width} height={ARROW_SIZE.height} aria-hidden>
        <use xlinkHref='#icon-arrow' />
      </svg>
    </button>
  );
});

Arrow.displayName = 'SimilarProductsSliderArrow';
